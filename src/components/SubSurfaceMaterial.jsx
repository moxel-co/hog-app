import * as THREE from 'three';
import { SubsurfaceScatteringShader } from 'three/addons/shaders/SubsurfaceScatteringShader.js';

export const SSSMaterial = (
  thicknessDistortion = 0.1,
  thicknessColor = [1, 1, 1],
  thicknessAmbient = 0.2,
  thicknessAttenuation = 0.8,
  thicknessPower = 2.0,
  thicknessScale = 1.0
) => {
  const loader = new THREE.TextureLoader();
  const imgTexture = loader.load('./assets/common/white.jpg');
  imgTexture.colorSpace = THREE.SRGBColorSpace;

  const thicknessTexture = loader.load('./assets/common/white.jpg');

  imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;

  const shader = SubsurfaceScatteringShader;
  const uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  uniforms['map'].value = imgTexture;

  uniforms['diffuse'].value = new THREE.Vector3(1.0, 1.0, 1.0);
  uniforms['shininess'].value = 100;

  uniforms['thicknessMap'].value = thicknessTexture;
  uniforms['thicknessColor'].value = new THREE.Vector3(thicknessColor);
  uniforms['thicknessDistortion'].value = thicknessDistortion;
  uniforms['thicknessAmbient'].value = thicknessAmbient;
  uniforms['thicknessAttenuation'].value = thicknessAttenuation;
  uniforms['thicknessPower'].value = thicknessPower;
  uniforms['thicknessScale'].value = thicknessScale;

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    lights: true,
  });

  return material;
};

export default SSSMaterial;