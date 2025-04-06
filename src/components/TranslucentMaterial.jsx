import * as THREE from 'three'

// Create a custom material that simulates subsurface scattering
export const createSubsurfaceScatteringMaterial = (color = 0xffffff, emissiveColor = 0xccccff) => {
  // Create a MeshPhongMaterial as the base
  const material = new THREE.MeshPhongMaterial({
    color: color,
    emissive: emissiveColor,
    emissiveIntensity: 0.2,
    shininess: 50,
    transparent: true,
    opacity: 0.9
  });

  // Add custom shader chunks to simulate subsurface scattering
  material.onBeforeCompile = (shader) => {
    // Add custom uniforms
    shader.uniforms.thicknessColor = { value: new THREE.Color(emissiveColor) };
    shader.uniforms.thicknessDistortion = { value: 0.1 };
    shader.uniforms.thicknessAmbient = { value: 0.4 };
    shader.uniforms.thicknessAttenuation = { value: 0.8 };
    shader.uniforms.thicknessPower = { value: 2.0 };
    shader.uniforms.thicknessScale = { value: 16.0 };

    // Add uniform declarations to the shader
    shader.fragmentShader = shader.fragmentShader.replace(
      'uniform vec3 emissive;',
      `uniform vec3 emissive;
      uniform vec3 thicknessColor;
      uniform float thicknessDistortion;
      uniform float thicknessAmbient;
      uniform float thicknessAttenuation;
      uniform float thicknessPower;
      uniform float thicknessScale;`
    );

    // Add subsurface scattering calculation before final fragment color
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `#include <dithering_fragment>
      
      // Calculate subsurface scattering contribution
      float thickness = thicknessScale * 0.5;
      vec3 viewDirection = normalize(vViewPosition);
      float scatteringHalo = smoothstep(0.0, 1.0, thickness * 
        (thicknessDistortion * (0.5 - dot(normal, viewDirection)) + 0.5));
      
      vec3 subsurfaceColor = thicknessColor * scatteringHalo;
      subsurfaceColor += thicknessAmbient * thicknessColor;
      subsurfaceColor = pow(subsurfaceColor, vec3(thicknessPower)) * thicknessAttenuation;
      
      // Add subsurface scattering to final color
      gl_FragColor.rgb += subsurfaceColor;`
    );

    // Store the modified shader for reference
    material.userData.shader = shader;
  };

  return material;
};

export default createSubsurfaceScatteringMaterial;