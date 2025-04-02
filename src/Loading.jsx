import { useRef } from 'react' 
import { useFrame } from '@react-three/fiber'
import { Html, ContactShadows, OrbitControls, DeviceOrientationControls, useGLTF } from '@react-three/drei'
import { isMobile } from 'react-device-detect'
// import * as THREE from 'three'
import { Perf } from 'r3f-perf'
// import { useControls } from 'leva'

export default function Loading()
{
    const { nodes } = useGLTF('./logo.glb')
    const logo = useRef()

    useFrame(( {mouse, viewport} ) => {
        const x = (mouse.x * viewport.width) / 30
        const y = (mouse.y * viewport.height) / 30
        logo.current.lookAt(x, y, 1)
    })

    return <>
        <OrbitControls
            makeDefault
            enableDamping
            enablePan={false}
            enableRotate={false}
            minDistance={2}
            maxDistance={6}
            
        />
        {/* <DeviceOrientationControls /> */}
        <directionalLight position={ [-2 , 2, 0] } intensity={ 8 }/>
        <ambientLight intensity={ 1.6 }/>
        <ContactShadows position={ [0, -0.4, 0] } opacity={0.3}/>
        
        <group ref={logo}>
            <mesh 
                geometry={ nodes.moxel_logo.geometry }
                rotation={ nodes.moxel_logo.rotation }
                scale={0.2}
                >
                <meshStandardMaterial color="#145892" />
                {/* <Html
                    wrapperClass='loadingProgress'
                    distanceFactor={ 4 }
                    center
                    occlude={[logo]}
                >100%
                </Html> */}
            </mesh>
        </group>
    </>
}

useGLTF.preload('./logo.glb')