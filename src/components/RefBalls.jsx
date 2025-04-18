import { useRef } from 'react' 
import { useFrame } from '@react-three/fiber'
import { Text, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'

const asset_name = 'refballs'

export default function RefBalls()
{
    
    const { nodes } = useGLTF(`./assets/${asset_name}/model.glb`)
    const t_color = useTexture(`./assets/${asset_name}/color.jpg`)
    const t_normal = useTexture(`./assets/${asset_name}/normal.jpg`)
    const t_orm = useTexture(`./assets/${asset_name}/orm.jpg`)
    t_orm.flipY = false

    const { ref_toggle } = useControls({
        ref_toggle: true
    })

    return <>
      <mesh
          geometry={ nodes.refBalls.geometry }
          rotation={ nodes.refBalls.rotation }
          position={ new THREE.Vector3( 1.5, 4, 0 ) }
          scale={ 0.4 }
          visible={ ref_toggle }
          >

          <meshStandardMaterial map={ t_color } metalnessMap={t_orm} roughnessMap={t_orm} metalness={1} map-flipY={ false }/>


      </mesh>
    </>
}

useGLTF.preload(`./assets/${asset_name}/model.glb`)