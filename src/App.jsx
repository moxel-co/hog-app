import React from "react";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import {
  ToneMapping,
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { BlendFunction } from "postprocessing";
import { Guitar } from "./guitar.jsx";
import useVariant from "./stores/useVariant.jsx";

export default function App() {

  const isPostEffectsEnabled = useVariant((state) => state.isPostEffectsEnabled);

  return (
    <>
      <EffectComposer enabled={isPostEffectsEnabled}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Bloom intensity={0.3} luminanceThreshold={0.8} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0005]}
        />
      </EffectComposer>

      {/* Set the initial position of the camera */}
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />

      <Environment
        files="./assets/common/latlong/dualSense_1k.hdr"
        environmentRotation={[0, Math.PI * 20, 0]}
      />
      <OrbitControls
        enableDamping
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.2}
        target={[0, 4, 0]}
        autoRotate={useVariant((state) => state.isRotationEnabled)}
        autoRotateSpeed={0.4}
      />
      <ContactShadows opacity={0.3} />
      <Guitar />
    </>
  );
}
