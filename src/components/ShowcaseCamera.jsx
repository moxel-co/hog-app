import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useVariant from '../stores/useVariant'

export default function ShowcaseCamera(props) {
  const group = useRef()
  const animatedCamRef = useRef()
  const { camera } = useThree()
  const { animations } = useGLTF('./assets/prpGuitar/camera.glb')
  const { actions } = useAnimations(animations, group)

  // Animation sequence
  const sequence = ['CamAction1', 'CamAction2', 'CamAction3', 'CamAction4', 'CamAction5']
  const indexRef = useRef(0)

  const isShowcaseViewEnabled = useVariant((state) => state.isShowcaseViewEnabled);

  useEffect(() => {
    if (!actions || sequence.length === 0) return
  
    let currentAction = null
  
    const playNext = () => {
      const name = sequence[indexRef.current % sequence.length]
      const nextAction = actions[name]
  
      if (!nextAction) return
  
      if (currentAction && currentAction !== nextAction) {
        currentAction.fadeOut(0)
        currentAction.stop() // ensure it's fully removed
      }
  
      currentAction = nextAction
      currentAction.reset().fadeIn(0).play()
      currentAction.clampWhenFinished = true
      currentAction.loop = THREE.LoopOnce
  
      const mixer = currentAction.getMixer()
      const onFinished = () => {
        mixer.removeEventListener('finished', onFinished)
        indexRef.current = (indexRef.current + 1) % sequence.length
        playNext()
      }
  
      mixer.addEventListener('finished', onFinished)
    }
  
    playNext()
  }, [actions])
  

  // Sync animated camera to canvas camera
  useFrame(() => {
    const animatedCam = group.current.getObjectByName('showcaseCam')
    if (animatedCam) {
      camera.position.copy(animatedCam.getWorldPosition(new THREE.Vector3()))
      camera.quaternion.copy(animatedCam.getWorldQuaternion(new THREE.Quaternion()))
    }
  })
  
  
  

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera
          ref={animatedCamRef}
          name="showcaseCam"
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={37.996}
          position={[-0.031, 5.664, 2.838]}
          rotation={[0.093, 0.003, -0.747]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('./assets/prpGuitar/camera.glb')