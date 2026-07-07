import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Preload,
  RoundedBox,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

interface CubeSpec {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  offset: number;
}

const CUBES: CubeSpec[] = [
  {
    position: [-1.6, 0.5, 0],
    rotation: [0.3, 0.6, 0.1],
    scale: 0.75,
    color: "#1a99ff",
    speed: 0.6,
    offset: 0,
  },
  {
    position: [1.6, -0.4, -0.3],
    rotation: [0.5, 0.3, 0.4],
    scale: 0.9,
    color: "#a855f7",
    speed: 0.5,
    offset: 1.2,
  },
  {
    position: [0.2, 1.3, -0.6],
    rotation: [0.7, 0.8, 0.2],
    scale: 0.55,
    color: "#22d3ee",
    speed: 0.75,
    offset: 2.4,
  },
  {
    position: [-0.6, -1.1, 0.4],
    rotation: [0.2, 0.4, 0.6],
    scale: 0.6,
    color: "#d946ef",
    speed: 0.55,
    offset: 3.1,
  },
];

function Cube({ spec }: { spec: CubeSpec }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * spec.speed * 0.4;
    meshRef.current.rotation.y += delta * spec.speed * 0.55;
    const t = performance.now() * 0.001 + spec.offset;
    meshRef.current.position.y = spec.position[1] + Math.sin(t) * 0.18;
  });

  return (
    <group position={spec.position} rotation={spec.rotation}>
      <RoundedBox
        ref={meshRef}
        args={[spec.scale, spec.scale, spec.scale]}
        radius={0.08}
        smoothness={4}
      >
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          transmission={0.9}
          roughness={0.1}
          thickness={0.4}
          ior={1.3}
          chromaticAberration={0.06}
          color={spec.color}
          background={new THREE.Color("#04070f")}
        />
      </RoundedBox>
      {/* subtle glow shell */}
      <mesh scale={spec.scale * 1.08}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={spec.color}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const cubes = useMemo(() => CUBES, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const tx = pointer.x * 0.25;
    const ty = pointer.y * -0.2;
    groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <Cube key={i} spec={c} />
      ))}
    </group>
  );
}

export function FloatingCubesCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={45} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={0.7} color="#1a99ff" />
      <pointLight position={[-4, -3, 3]} intensity={0.5} color="#a855f7" />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
