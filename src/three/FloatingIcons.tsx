import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingIconsProps {
  labels?: string[];
  radius?: number;
}

const DEFAULT_LABELS = [
  "AWS",
  "Azure",
  "GCP",
  "K8s",
  "Docker",
  "TF",
  "GH",
  "AI",
  "PY",
  "RC",
];

export function FloatingIcons({
  labels = DEFAULT_LABELS,
  radius = 3.4,
}: FloatingIconsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    return labels.map((label, i) => {
      const angle = (i / labels.length) * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * 1.1;
      const rSpread = radius + (Math.random() - 0.5) * 0.6;
      return {
        label,
        angle,
        tilt,
        radius: rSpread,
        speed: 0.12 + Math.random() * 0.14,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, [labels, radius]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.045;
  });

  return (
    <group ref={groupRef}>
      {items.map((it, i) => (
        <FloatingChip
          key={i}
          label={it.label}
          angle={it.angle}
          tilt={it.tilt}
          radius={it.radius}
          speed={it.speed}
          offset={it.offset}
        />
      ))}
    </group>
  );
}

interface ChipProps {
  label: string;
  angle: number;
  tilt: number;
  radius: number;
  speed: number;
  offset: number;
}

function FloatingChip({
  label,
  angle,
  tilt,
  radius,
  speed,
  offset,
}: ChipProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.001;
    const a = angle + t * speed;
    const bob = Math.sin(t * 1.2 + offset) * 0.15;
    groupRef.current.position.set(
      Math.cos(a) * radius,
      Math.sin(tilt) * radius * 0.4 + bob,
      Math.sin(a) * radius
    );
  });

  return (
    <group ref={groupRef}>
      <Billboard>
        <RoundedBox args={[0.9, 0.38, 0.02]} radius={0.09} smoothness={4}>
          <meshBasicMaterial color="#0a1024" transparent opacity={0.88} />
        </RoundedBox>
        <mesh position={[0, 0, 0.012]}>
          <ringGeometry args={[0.5, 0.52, 6]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.45}
            depthWrite={false}
          />
        </mesh>
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.16}
          color="#e6ecf5"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}
