import {useLoader} from '@react-three/fiber'
import * as THREE from 'three'
import {RigidBody} from "@react-three/rapier";

export default function Table() {
    const [
            colorMap,
            aoMap,
            roughnessMap,
            normalMap
        ] = useLoader(THREE.TextureLoader, [
            '/textures/wood/WoodFloor043_2K-JPG_Color.jpg',
            '/textures/wood/WoodFloor043_2K-JPG_AmbientOcclusion.jpg',
            '/textures/wood/WoodFloor043_2K-JPG_Roughness.jpg',
            '/textures/wood/WoodFloor043_2K-JPG_NormalGL.jpg'
        ])


    ;[colorMap, aoMap, roughnessMap, normalMap].forEach(tex => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(4, 4)
    })

    return (
        <RigidBody type="fixed">
            <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
                <boxGeometry args={[10, 0.2, 10]}/>
                <meshStandardMaterial
                    map={colorMap}             // цвет дерева
                    normalMap={normalMap}      // рельеф
                    roughnessMap={roughnessMap} // матовость
                    aoMap={aoMap}              // лёгкое затенение
                    roughness={1}
                    metalness={0}
                />
            </mesh>
        </RigidBody>
    )
}