import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Globe } from "./Globe";
import { Particles } from "./Particles";
import { FloatingIcons } from "./FloatingIcons";

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      style={{ background: "transparent" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={0.9} color="#1a99ff" />
      <pointLight position={[-5, -3, -3]} intensity={0.6} color="#a855f7" />
      <pointLight position={[0, -4, 3]} intensity={0.35} color="#22d3ee" />

      <Suspense fallback={null}>
        <Particles />
        <Globe />
        <FloatingIcons />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <Vignette
            eskil={false}
            offset={0.2}
            darkness={0.9}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Suspense>

      <Preload all />
    </Canvas>
  );
}
