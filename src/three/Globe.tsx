import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface GlobeProps {
  radius?: number;
  dotCount?: number;
  arcCount?: number;
}

interface Point3 {
  vec: THREE.Vector3;
  lat: number;
  lon: number;
}

interface ArcSpec {
  curve: THREE.QuadraticBezierCurve3;
  color: THREE.Color;
  offset: number;
  line: THREE.Line;
}

function sphericalToVec(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Cinematic globe: Fibonacci-lattice dot surface + wireframe + halo, plus
 * animated great-circle arcs between "cities" and slow mouse parallax.
 */
export function Globe({
  radius = 1.6,
  dotCount = 2400,
  arcCount = 16,
}: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const arcsRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const dotGeometry = useMemo(() => {
    const arr = new Float32Array(dotCount * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      arr[i * 3 + 0] = Math.cos(theta) * r * radius;
      arr[i * 3 + 1] = y * radius;
      arr[i * 3 + 2] = Math.sin(theta) * r * radius;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [dotCount, radius]);

  // Random "cities" on the sphere
  const points = useMemo<Point3[]>(() => {
    const arr: Point3[] = [];
    for (let i = 0; i < 26; i++) {
      const lat = (Math.random() - 0.5) * 140;
      const lon = (Math.random() - 0.5) * 360;
      arr.push({ vec: sphericalToVec(lat, lon, radius * 1.005), lat, lon });
    }
    return arr;
  }, [radius]);

  // Great-circle arcs between random pairs, pre-built as THREE.Line objects
  const arcs = useMemo<ArcSpec[]>(() => {
    const list: ArcSpec[] = [];
    const palette = [
      new THREE.Color("#1a99ff"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#d946ef"),
    ];
    for (let i = 0; i < arcCount; i++) {
      const a = points[Math.floor(Math.random() * points.length)];
      const b = points[Math.floor(Math.random() * points.length)];
      if (!a || !b || a === b) continue;
      const mid = a.vec
        .clone()
        .add(b.vec)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius * 1.55);
      const curve = new THREE.QuadraticBezierCurve3(a.vec, mid, b.vec);
      const color = palette[i % palette.length];
      const geometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(60)
      );
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.55,
      });
      const line = new THREE.Line(geometry, material);
      list.push({ curve, color, offset: Math.random(), line });
    }
    return list;
  }, [points, radius, arcCount]);

  const streamGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Base spin + gentle mouse parallax
      groupRef.current.rotation.y += delta * 0.18;
      const targetX = pointer.y * 0.25;
      groupRef.current.rotation.x +=
        (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z +=
        (-pointer.x * 0.05 - groupRef.current.rotation.z) * 0.05;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(performance.now() * 0.001) * 0.02;
      glowRef.current.scale.setScalar(s);
    }
    if (streamGroup.current) {
      streamGroup.current.children.forEach((child, i) => {
        const arc = arcs[i];
        if (!arc) return;
        const t = (performance.now() * 0.0005 + arc.offset) % 1;
        const p = arc.curve.getPoint(t);
        child.position.copy(p);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner deep sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 64, 64]} />
        <meshBasicMaterial
          color="#04070f"
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe */}
      <mesh>
        <sphereGeometry args={[radius, 32, 24]} />
        <meshBasicMaterial
          color="#1a99ff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Dot layer */}
      <points geometry={dotGeometry}>
        <pointsMaterial
          size={0.028}
          color="#4dafff"
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      {/* Cities */}
      {points.map((p, i) => (
        <mesh key={i} position={p.vec}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      ))}

      {/* Arcs — mounted as primitives to avoid the SVG <line> namespace clash */}
      <group ref={arcsRef}>
        {arcs.map((a, i) => (
          <primitive key={i} object={a.line} />
        ))}
      </group>

      {/* Data-stream packets riding the arcs */}
      <group ref={streamGroup}>
        {arcs.map((a, i) => (
          <mesh key={`s-${i}`}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color={a.color} />
          </mesh>
        ))}
      </group>

      {/* Halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[radius * 1.12, 48, 48]} />
        <meshBasicMaterial
          color="#1a99ff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Light rings */}
      {[1.35, 1.55, 1.75].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.35, 0, i * 0.25]}>
          <ringGeometry args={[radius * r, radius * r + 0.005, 128]} />
          <meshBasicMaterial
            color={i === 1 ? "#a855f7" : "#22d3ee"}
            transparent
            opacity={0.24 - i * 0.05}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
