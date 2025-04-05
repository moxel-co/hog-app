import { useThree } from '@react-three/fiber';

export const useUpdateDynamicCamera = () => {
  const { camera } = useThree();

  const resetCamera = () => {
    camera.position.set(0, 0, 5); // Adjust the z-axis if needed
    camera.lookAt(0, 0, 0);
  };

  return resetCamera;
};