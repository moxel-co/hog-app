import React, { useRef, useEffect } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import useVariant from "../stores/useVariant";

export function DynamicCamera() {
  const targetType = useVariant((state) => state.targetType);
  const cameraPosition = useVariant((state) => state.cameraPosition);
  const cameraTarget = useVariant((state) => state.cameraTarget);
  const isRotationEnabled = useVariant((state) => state.isRotationEnabled);
  const isDynamicViewEnabled = useVariant((state) => state.isDynamicViewEnabled);

  const cameraRef = useRef();
  const controlsRef = useRef();

  // Define presets for camera positions and targets
  const cameraPresets = {
    default: {
      position: [0, 5, 10],
      target: [0, 4, 0],
    },
    headstock: {
      position: [0, 7.5, 3],
      target: [0, 7.2, 0],
    },
    headstock2: {
      position: [1, 7.5, 3],
      target: [1, 7.2, 0],
    },
    body: {
      position: [0, 2.4, 6],
      target: [0, 2.4, 0],
    },
    inlay: {
      position: [0, 4.2, 3],
      target: [0, 4.2, 0],
    },
    starPowerButton: {
      position: [0, 0, 0],
      target: [0, 1, 0],
    },
  };

  // Animate camera position and target only when targetType changes and isDynamicViewEnabled is true
  useEffect(() => {
    if (!isDynamicViewEnabled) return; // Skip animation if dynamic view is disabled

    const preset = cameraPresets[targetType] || cameraPresets.default;

    // Animate camera position
    gsap.to(cameraRef.current.position, {
      x: preset.position[0],
      y: preset.position[1],
      z: preset.position[2],
      duration: 1, // Animation duration
      ease: "power1.out", // Easing function
      onUpdate: () => {
        useVariant.setState({
          cameraPosition: [
            cameraRef.current.position.x,
            cameraRef.current.position.y,
            cameraRef.current.position.z,
          ],
        });
      },
    });

    // Animate camera target
    gsap.to(controlsRef.current.target, {
      x: preset.target[0],
      y: preset.target[1],
      z: preset.target[2],
      duration: 1, // Animation duration
      ease: "power1.out", // Easing function
      onUpdate: () => {
        useVariant.setState({
          cameraTarget: [
            controlsRef.current.target.x,
            controlsRef.current.target.y,
            controlsRef.current.target.z,
          ],
        });
        controlsRef.current.update(); // Update controls during animation
      },
    });
  }, [targetType, isDynamicViewEnabled]); // Add isDynamicViewEnabled as a dependency

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={cameraPosition} />
      <OrbitControls
        ref={controlsRef}
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