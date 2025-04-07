import * as THREE from 'three'
import { SubsurfaceScatteringShader } from 'three/addons/shaders/SubsurfaceScatteringShader.js';

export const SSSMaterial = () => {

    const loader = new THREE.TextureLoader();
    const imgTexture = loader.load( './assets/common//white.jpg' );
    imgTexture.colorSpace = THREE.SRGBColorSpace;

    const thicknessTexture = loader.load( './assets/common//white.jpg' );
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;

    const shader = SubsurfaceScatteringShader;
    const uniforms = THREE.UniformsUtils.clone( shader.uniforms );

    uniforms[ 'map' ].value = imgTexture;

    uniforms[ 'diffuse' ].value = new THREE.Vector3( 1.0, 1.0, 1.0 );
    uniforms[ 'shininess' ].value = 500;

    uniforms[ 'thicknessMap' ].value = thicknessTexture;
    uniforms[ 'thicknessColor' ].value = new THREE.Vector3( 0.1, 0.2, 0.8 );
    uniforms[ 'thicknessDistortion' ].value = 0.1;
    uniforms[ 'thicknessAmbient' ].value = 0.2;
    uniforms[ 'thicknessAttenuation' ].value = 0.8;
    uniforms[ 'thicknessPower' ].value = 2.0;
    uniforms[ 'thicknessScale' ].value = 16.0;

    const material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        lights: true
    } );

    return material;
}

export default SSSMaterial;