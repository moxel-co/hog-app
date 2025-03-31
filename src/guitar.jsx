import { useRef, useEffect, useState } from 'react' 
import { useFrame } from '@react-three/fiber'
import { Text, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import useVariant from './stores/useVariant.jsx'

const asset_name = 'prpGuitar'

export function Guitar(props) {
  const { nodes, materials } = useGLTF(`./assets/${asset_name}/model.glb`)

  const base = useVariant((state) => state.base);
  const headstock = useVariant((state) => state.headstock);
  const inlay = useVariant((state) => state.inlay);
  const starPowerButton = useVariant((state) => state.starPowerButton);
  const baseColor = useVariant((state) => state.baseColor);
  const neckColor = useVariant((state) => state.neckColor);
  const fretBoardColor = useVariant((state) => state.fretBoardColor);
  const fretBoardBindingColor = useVariant((state) => state.fretBoardBindingColor);
  const pickGuardColor = useVariant((state) => state.pickGuardColor);
  const hardwareColor = useVariant((state) => state.hardwareColor);


  const colorMapping = [
    {
      name: 'orange',
      hex: '#d54a31'
    },
    {
      name: 'pink',
      hex: '#eb5577'
    },
    {
      name: 'black',
      hex: '#1a1a1a'
    },
    {
      name: 'blue',
      hex: '#202f76'
    },
    {
      name: 'green',
      hex: '#165c44'
    },
    {
      name: 'light blue',
      hex: '#32819a'
    },
    {
      name: 'light green',
      hex: '#4c964a'
    },
    {
      name: 'yellow',
      hex: '#d8aa36'
    },
    {
      name: 'purple',
      hex: '#8743cb'
    },
    {
      name: 'red',
      hex: '#861212'
    },
    {
      name: 'white',
      hex: '#d8d8d8'
    },
    {
      name: 'dark brown',
      hex: '#3e3028'
    },
    {
      name: 'brown',
      hex: '#966143'
    },
    {
      name: 'tan',
      hex: '#d59b7a'
    },
  ]

  const getColorHex = (name) => {
    const color = colorMapping.find(color => color.name === name)
    return color ? color.hex : null
  }

  const m_blackPlastic = new THREE.MeshStandardMaterial({color: "black", roughness: 0.3})
  const m_redPlastic = new THREE.MeshStandardMaterial({color: "#ce1c1c", roughness: 0.2})
  const m_greenPlastic = new THREE.MeshStandardMaterial({color: "#56aa0e", roughness: 0.3})
  const m_yellowPlastic = new THREE.MeshStandardMaterial({color: "#ebab09", roughness: 0.3})
  const m_bluePlastic = new THREE.MeshStandardMaterial({color: "#3f1cb1", roughness: 0.3})
  const m_orangePlastic = new THREE.MeshStandardMaterial({color: '#f25530', roughness: 0.3})
  const m_whitePlastic = new THREE.MeshStandardMaterial({color: "white", roughness: 0.3})
  const m_brushedMetal = new THREE.MeshStandardMaterial({color: "grey", roughness: 0.5, metalness: 0.5})
  const m_hardwareMetal = new THREE.MeshStandardMaterial({color: hardwareColor, roughness: 0.2, metalness: 1})
  const m_basePlastic = new THREE.MeshStandardMaterial({color: getColorHex(baseColor), roughness: 0.4, metalness: 0})
  const m_neckPlastic = new THREE.MeshStandardMaterial({color: getColorHex(neckColor), roughness: 0.4, metalness: 0})
  const m_fretboardBindingPlastic = new THREE.MeshStandardMaterial({color: getColorHex(fretBoardBindingColor), roughness: 0.4, metalness: 0})
  const m_fretBoardWood = new THREE.MeshStandardMaterial({color: getColorHex(fretBoardColor), roughness: 0.8, metalness: 0})
  const m_pickGuardPlastic = new THREE.MeshStandardMaterial({color: getColorHex(pickGuardColor), roughness: 0.4, metalness: 0})

  // Create a mapping between material names and material objects
  const materialMapping = {
    '__blackPlastic__': m_blackPlastic,
    '__redPlastic__': m_redPlastic,
    '__greenPlastic__': m_greenPlastic,
    '__yellowPlastic__': m_yellowPlastic,
    '__bluePlastic__': m_bluePlastic,
    '__orangePlastic__': m_orangePlastic,
    '__whitePlastic__': m_whitePlastic,
    '__brushedMetal__': m_brushedMetal,
    '__hardwareMetal__': m_hardwareMetal,
    '__basePlastic__': m_basePlastic,
    '__neckPlastic__': m_neckPlastic,
    '__fretBoardBindingPlastic__': m_fretboardBindingPlastic,
    '__fretBoardWood__': m_fretBoardWood,
    '__pickGuardPlastic__': m_pickGuardPlastic,
  }

  // Assign materials to geometries based on their names
  Object.keys(nodes).forEach(key => {
    Object.keys(materialMapping).forEach(materialKey => {
      if (key.includes(materialKey)) {
        nodes[key].material = materialMapping[materialKey]
      }
    })
  })

  return (
    <group {...props} dispose={null}>
      <group visible={base === "briefcase"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_back__basePlastic__geo.geometry}
          material={nodes.body_briefcase_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_buttonA__blackPlastic__geo.geometry}
          material={nodes.body_briefcase_buttonA__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_buttonB__blackPlastic__geo.geometry}
          material={nodes.body_briefcase_buttonB__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_buttonSP__blackPlastic__geo.geometry}
          material={nodes.body_briefcase_buttonSP__blackPlastic__geo.material}
          visible={starPowerButton}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_front__basePlastic__geo.geometry}
          material={nodes.body_briefcase_front__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_mmPivot__blackPlastic__geo.geometry}
          material={nodes.body_briefcase_mmPivot__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_pickGuard__pickGuardPlastic__geo.geometry}
          material={nodes.body_briefcase_pickGuard__pickGuardPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_briefcase_strapMount__blackPlastic__geo.geometry}
          material={nodes.body_briefcase_strapMount__blackPlastic__geo.material}
        />
      </group>
      <group visible={base === "broadcaster"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_back__basePlastic__geo.geometry}
          material={nodes.body_broadcaster_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_buttonA__blackPlastic__geo.geometry}
          material={nodes.body_broadcaster_buttonA__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_buttonB__blackPlastic__geo.geometry}
          material={nodes.body_broadcaster_buttonB__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_buttonSP__blackPlastic__geo.geometry}
          material={nodes.body_broadcaster_buttonSP__blackPlastic__geo.material}
          visible={starPowerButton}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_buttonTrim__greyPlastic__geo.geometry}
          material={nodes.body_broadcaster_buttonTrim__greyPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_front__basePlastic__geo.geometry}
          material={nodes.body_broadcaster_front__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_mmPivot__blackPlastic__geo.geometry}
          material={nodes.body_broadcaster_mmPivot__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_pickGuard__pickGuardPlastic__geo.geometry}
          material={nodes.body_broadcaster_pickGuard__pickGuardPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_broadcaster_strapMount__blackPlastic__geo.geometry}
          material={nodes.body_broadcaster_strapMount__blackPlastic__geo.material}
        />
      </group>
      <group visible={base === "jazzy"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_back__basePlastic__geo.geometry}
          material={nodes.body_jazzy_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_bridge__hardwareMetal__geo.geometry}
          material={nodes.body_jazzy_bridge__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_buttonA__blackPlastic__geo.geometry}
          material={nodes.body_jazzy_buttonA__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_buttonB__blackPlastic__geo.geometry}
          material={nodes.body_jazzy_buttonB__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_buttonSP__blackPlastic__geo.geometry}
          material={nodes.body_jazzy_buttonSP__blackPlastic__geo.material}
          visible={starPowerButton}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_front__basePlastic__geo.geometry}
          material={nodes.body_jazzy_front__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_mmPivot__blackPlastic__geo.geometry}
          material={nodes.body_jazzy_mmPivot__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_pickGuard__pickGuardPlastic__geo.geometry}
          material={nodes.body_jazzy_pickGuard__pickGuardPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_jazzy_strapMount__blackPlastic__geo.geometry}
          material={nodes.body_jazzy_strapMount__blackPlastic__geo.material}
        />
      </group>
      <group visible={base === "reliable"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_back__basePlastic__geo.geometry}
          material={nodes.body_reliable_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_bridge__hardwareMetal__geo.geometry}
          material={nodes.body_reliable_bridge__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_buttonA__blackPlastic__geo.geometry}
          material={nodes.body_reliable_buttonA__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_buttonB__blackPlastic__geo.geometry}
          material={nodes.body_reliable_buttonB__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_buttonSP__blackPlastic__geo.geometry}
          material={nodes.body_reliable_buttonSP__blackPlastic__geo.material}
          visible={starPowerButton}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_front__basePlastic__geo.geometry}
          material={nodes.body_reliable_front__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_mmPivot__blackPlastic__geo.geometry}
          material={nodes.body_reliable_mmPivot__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_pickGuard__pickGuardPlastic__geo.geometry}
          material={nodes.body_reliable_pickGuard__pickGuardPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_reliable_strapMount__blackPlastic__geo.geometry}
          material={nodes.body_reliable_strapMount__blackPlastic__geo.material}
        />
      </group>
      <group visible={base === "thunderbird"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_back__basePlastic__geo.geometry}
          material={nodes.body_thunderbird_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_buttonA__blackPlastic__geo.geometry}
          material={nodes.body_thunderbird_buttonA__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_buttonB__blackPlastic__geo.geometry}
          material={nodes.body_thunderbird_buttonB__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_buttonSP__blackPlastic__geo.geometry}
          material={nodes.body_thunderbird_buttonSP__blackPlastic__geo.material}
          visible={starPowerButton}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_detail__basePlastic__geo.geometry}
          material={nodes.body_thunderbird_detail__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_detail__whitePlastic__geo.geometry}
          material={nodes.body_thunderbird_detail__whitePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_front__basePlastic__geo.geometry}
          material={nodes.body_thunderbird_front__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_mmPivot__blackPlastic__geo.geometry}
          material={nodes.body_thunderbird_mmPivot__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_thunderbird_strapMount__blackPlastic__geo.geometry}
          material={nodes.body_thunderbird_strapMount__blackPlastic__geo.material}
        />
      </group>
      <group visible={base === "viper"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_viper_back__basePlastic__geo.geometry}
          material={nodes.body_viper_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_viper_buttonA__blackPlastic__geo.geometry}
          material={nodes.body_viper_buttonA__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_viper_buttonB__blackPlastic__geo.geometry}
          material={nodes.body_viper_buttonB__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_viper_buttonSP__blackPlastic__geo.geometry}
          material={nodes.body_viper_buttonSP__blackPlastic__geo.material}
          visible={starPowerButton}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_viper_front__basePlastic__geo.geometry}
          material={nodes.body_viper_front__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_viper_mmPivot__blackPlastic__geo.geometry}
          material={nodes.body_viper_mmPivot__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body_viper_strapMount__blackPlastic__geo.geometry}
          material={nodes.body_viper_strapMount__blackPlastic__geo.material}
        />
      </group>
      <group visible={headstock === "arrow"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_arrow_back__basePlastic__geo.geometry}
          material={nodes.headstock_arrow_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_arrow_detail__basePlastic__geo.geometry}
          material={nodes.headstock_arrow_detail__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_arrow_front__blackPlastic__geo.geometry}
          material={nodes.headstock_arrow_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_arrow_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_arrow_pegs__hardwareMetal__geo.material}
        />
      </group>
      <group visible={headstock === "aviator"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_aviator_back__basePlastic__geo.geometry}
          material={nodes.headstock_aviator_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_aviator_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_aviator_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_aviator_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_aviator_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_aviator_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_aviator_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <group visible={headstock === "briefcase"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_briefcase_back__basePlastic__geo.geometry}
          material={nodes.headstock_briefcase_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_briefcase_front__blackPlastic__geo.geometry}
          material={nodes.headstock_briefcase_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_briefcase_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_briefcase_pegs__hardwareMetal__geo.material}
        />
      </group>
      <group visible={headstock === "broadcaster"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_broadcaster_back__basePlastic__geo.geometry}
          material={nodes.headstock_broadcaster_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_broadcaster_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_broadcaster_pegs__hardwareMetal__geo.material}
        />
      </group>
      <group visible={headstock === "fallenangel"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_fallenangel_back__basePlastic__geo.geometry}
          material={nodes.headstock_fallenangel_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_fallenangel_detail__whitePlastic__geo.geometry}
          material={nodes.headstock_fallenangel_detail__whitePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_fallenangel_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_fallenangel_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_fallenangel_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_fallenangel_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_fallenangel_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_fallenangel_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.headstock_headless_back__basePlastic__geo.geometry}
        material={nodes.headstock_headless_back__basePlastic__geo.material}
        visible={headstock === 'headless'}
      />
      <group visible={headstock === "ninjastar"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_ninjastar_back__basePlastic__geo.geometry}
          material={nodes.headstock_ninjastar_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_ninjastar_front__blackPlastic__geo.geometry}
          material={nodes.headstock_ninjastar_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_ninjastar_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_ninjastar_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_ninjastar_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_ninjastar_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_ninjastar_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_ninjastar_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <group visible={headstock === "oversized"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_oversized_back__basePlastic__geo.geometry}
          material={nodes.headstock_oversized_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_oversized_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_oversized_pegs__hardwareMetal__geo.material}
        />
      </group>
      <group visible={headstock === "plankspanker"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_plankspanker_back__basePlastic__geo.geometry}
          material={nodes.headstock_plankspanker_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_plankspanker_detail__whitePlastic__geo.geometry}
          material={nodes.headstock_plankspanker_detail__whitePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_plankspanker_front__blackPlastic__geo.geometry}
          material={nodes.headstock_plankspanker_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_plankspanker_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_plankspanker_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_plankspanker_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_plankspanker_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_plankspanker_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_plankspanker_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <group visible={headstock === "reliable"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable_back__basePlastic__geo.geometry}
          material={nodes.headstock_reliable_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable_front__blackPlastic__geo.geometry}
          material={nodes.headstock_reliable_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_reliable_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_reliable_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_reliable_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <group visible={headstock === "reliable12"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable12_back__basePlastic__geo.geometry}
          material={nodes.headstock_reliable12_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable12_front__blackPlastic__geo.geometry}
          material={nodes.headstock_reliable12_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable12_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_reliable12_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable12_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_reliable12_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_reliable12_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_reliable12_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <group visible={headstock === "summit"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_summit_back__basePlastic__geo.geometry}
          material={nodes.headstock_summit_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_summit_front__blackPlastic__geo.geometry}
          material={nodes.headstock_summit_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_summit_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_summit_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_summit_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_summit_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_summit_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_summit_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <group visible={headstock === "thunderbird"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_thunderbird_back__basePlastic__geo.geometry}
          material={nodes.headstock_thunderbird_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_thunderbird_detail__whitePlastic__geo.geometry}
          material={nodes.headstock_thunderbird_detail__whitePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_thunderbird_front__blackPlastic__geo.geometry}
          material={nodes.headstock_thunderbird_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_thunderbird_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_thunderbird_pegs__hardwareMetal__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_thunderbird_trussRoadCover__blackPlastic__geo.geometry}
          material={nodes.headstock_thunderbird_trussRoadCover__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_thunderbird_trussRoadCoverTrim__whitePlastic__geo.geometry}
          material={nodes.headstock_thunderbird_trussRoadCoverTrim__whitePlastic__geo.material}
        />
      </group>
      <group visible={headstock === "viper"}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_viper_back__basePlastic__geo.geometry}
          material={nodes.headstock_viper_back__basePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_viper_detail__whitePlastic__geo.geometry}
          material={nodes.headstock_viper_detail__whitePlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_viper_front__blackPlastic__geo.geometry}
          material={nodes.headstock_viper_front__blackPlastic__geo.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.headstock_viper_pegs__hardwareMetal__geo.geometry}
          material={nodes.headstock_viper_pegs__hardwareMetal__geo.material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_bird__whitePlastic__geo.geometry}
        material={nodes.inlay_bird__whitePlastic__geo.material}
        visible={inlay === 'bird'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_block__whitePlastic__geo.geometry}
        material={nodes.inlay_block__whitePlastic__geo.material}
        visible={inlay === 'block'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_classicDot__whitePlastic__geo.geometry}
        material={nodes.inlay_classicDot__whitePlastic__geo.material}
        visible={inlay === 'classicDot'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_deadbat__whitePlastic__geo.geometry}
        material={nodes.inlay_deadbat__whitePlastic__geo.material}
        visible={inlay === 'deadbat'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_lightning__whitePlastic__geo.geometry}
        material={nodes.inlay_lightning__whitePlastic__geo.material}
        visible={inlay === 'lightning'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_offsetDot__whitePlastic__geo.geometry}
        material={nodes.inlay_offsetDot__whitePlastic__geo.material}
        visible={inlay === 'offsetDot'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_parallelogram__whitePlastic__geo.geometry}
        material={nodes.inlay_parallelogram__whitePlastic__geo.material}
        visible={inlay === 'parallelogram'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_razor__whitePlastic__geo.geometry}
        material={nodes.inlay_razor__whitePlastic__geo.material}
        visible={inlay === 'razor'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_sharkfin__whitePlastic__geo.geometry}
        material={nodes.inlay_sharkfin__whitePlastic__geo.material}
        visible={inlay === 'sharkfin'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_snake__whitePlastic__geo.geometry}
        material={nodes.inlay_snake__whitePlastic__geo.material}
        visible={inlay === 'snake'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_trapezoid__whitePlastic__geo.geometry}
        material={nodes.inlay_trapezoid__whitePlastic__geo.material}
        visible={inlay === 'trapezoid'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.inlay_tree__whitePlastic__geo.geometry}
        material={nodes.inlay_tree__whitePlastic__geo.material}
        visible={inlay === 'tree'}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.logo_plate__chromeMetal__geo.geometry}
        material={nodes.logo_plate__chromeMetal__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.logo_text___blackPlastic__geo.geometry}
        material={nodes.logo_text___blackPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_back__neckPlastic__geo.geometry}
        material={nodes.neck_back__neckPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_buttonA__greenPlastic__geo.geometry}
        material={nodes.neck_buttonA__greenPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_buttonB__redPlastic__geo.geometry}
        material={nodes.neck_buttonB__redPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_buttonC__yellowPlastic__geo.geometry}
        material={nodes.neck_buttonC__yellowPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_buttonD__bluePlastic__geo.geometry}
        material={nodes.neck_buttonD__bluePlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_buttonE__orangePlastic__geo.geometry}
        material={nodes.neck_buttonE__orangePlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_buttonTrim__translucentPlastic__geo.geometry}
        material={nodes.neck_buttonTrim__translucentPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_fretboard__fretBoardWood__geo.geometry}
        material={nodes.neck_fretboard__fretBoardWood__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_frets__brushedMetal__geo.geometry}
        material={nodes.neck_frets__brushedMetal__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_polybar__fretboardBindingPlastic__geo.geometry}
        material={nodes.neck_polybar__fretboardBindingPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_riviet1__bluePlastic__geo.geometry}
        material={nodes.neck_riviet1__bluePlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_riviet2__redPlastic__geo.geometry}
        material={nodes.neck_riviet2__redPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_riviet3__yellowPlastic__geo.geometry}
        material={nodes.neck_riviet3__yellowPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_riviet4__bluePlastic__geo.geometry}
        material={nodes.neck_riviet4__bluePlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_riviet5__orangePlastic__geo.geometry}
        material={nodes.neck_riviet5__orangePlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.neck_riviets__blackPlastic__geo.geometry}
        material={nodes.neck_riviets__blackPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.strummer_base__blackPlastic__geo.geometry}
        material={nodes.strummer_base__blackPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.strummer_insertA__blackPlastic__geo.geometry}
        material={nodes.strummer_insertA__blackPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.strummer_insertB__blackPlastic__geo.geometry}
        material={nodes.strummer_insertB__blackPlastic__geo.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.strummer_main__translucentPlastic__geo.geometry}
        material={nodes.strummer_main__translucentPlastic__geo.material}
      />
    </group>
  )
}

useGLTF.preload(`./assets/${asset_name}/model.glb`)