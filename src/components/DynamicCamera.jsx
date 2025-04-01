import React, { useRef } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useVariant from "../stores/useVariant";

export function DynamicCamera() {
  const cameraPosition = useVariant((state) => state.cameraPosition);
  const targetCameraPosition = useVariant((state) => state.targetCameraPosition);
  const cameraTarget = useVariant((state) => state.cameraTarget);
  const targetCameraTarget = useVariant((state) => state.targetCameraTarget);
  const isAnimating = useVariant((state) => state.isAnimating);
  const isRotationEnabled = useVariant((state) => state.isRotationEnabled);
  
  const currentPos = useRef(new THREE.Vector3(...cameraPosition));
  const currentTarget = useRef(new THREE.Vector3(...cameraTarget));

  useFrame(() => {
    if (isAnimating) {
      const targetPos = new THREE.Vector3(...targetCameraPosition);
      const targetLook = new THREE.Vector3(...targetCameraTarget);

      // Interpolate camera position
      currentPos.current.lerp(targetPos, 0.05);
      currentTarget.current.lerp(targetLook, 0.05);

      // Update the store with current values
      useVariant.setState({ 
        cameraPosition: [currentPos.current.x, currentPos.current.y, currentPos.current.z],
        cameraTarget: [currentTarget.current.x, currentTarget.current.y, currentTarget.current.z]
      });

      // Check if we're close enough to stop animating
      if (currentPos.current.distanceTo(targetPos) < 0.01 && 
          currentTarget.current.distanceTo(targetLook) < 0.01) {
        useVariant.setState({ isAnimating: false });
      }
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <OrbitControls
        enableDamping
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.2}
        target={cameraTarget}
        autoRotate={isRotationEnabled}
        autoRotateSpeed={0.4}
      />
    </>
  );
}