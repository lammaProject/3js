import {RigidBody} from "@react-three/rapier";

export function Floor({size = 10}) {
    return (
        <RigidBody type="fixed" colliders="cuboid">
            <mesh position={[0, 0, 0]} receiveShadow>
                <boxGeometry args={[size, 0.2, size]}/>
                <meshStandardMaterial color="#888"/>
            </mesh>
        </RigidBody>
    );
}