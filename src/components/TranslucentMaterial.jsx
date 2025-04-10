import * as THREE from 'three';

// Fresnel shader implementation
const FresnelShader = {
  uniforms: {
    "color": { value: new THREE.Color(0xffffff) },
    "emissive": { value: new THREE.Color(0xccccff) },
    "opacity": { value: 0.9 },
    "power": { value: 2.0 },
    "bias": { value: 0.1 },
    "scale": { value: 1.0 }
  },

  vertexShader: /* glsl */`
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * mvPosition;
    }`,

  fragmentShader: /* glsl */`
    uniform vec3 color;
    uniform vec3 emissive;
    uniform float opacity;
    uniform float power;
    uniform float bias;
    uniform float scale;

    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      float fresnel = bias + scale * pow(1.0 + dot(vNormal, normalize(vViewPosition)), power);
      vec3 finalColor = mix(color, emissive, fresnel);
      gl_FragColor = vec4(finalColor, opacity);
    }`
};

// Create a Fresnel material with customizable parameters
export const createFresnelMaterial = ({
  color = 0xffffff,
  emissiveColor = 0xccccff,
  opacity = 0.1,
  power = 1,
  bias = 0.2,
  scale = 2
} = {}) => {
  // Clone the shader uniforms
  const uniforms = THREE.UniformsUtils.clone(FresnelShader.uniforms);

  // Set the uniform values
  uniforms["color"].value = new THREE.Color(color);
  uniforms["emissive"].value = new THREE.Color(emissiveColor);
  uniforms["opacity"].value = opacity;
  uniforms["power"].value = power;
  uniforms["bias"].value = bias;
  uniforms["scale"].value = scale;

  // Create the shader material
  return new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: FresnelShader.vertexShader,
    fragmentShader: FresnelShader.fragmentShader,
    transparent: false
  });
};

export default createFresnelMaterial;