import {RigidBody} from "@react-three/rapier";

export function RoomWalls({size = 10, height = 2}) {
    return (
        <>
            {/* Левая стена */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[-(size / 2), height / 2, 0]}>
                    <boxGeometry args={[0.2, height, size]}/>
                    <meshStandardMaterial color="gray" transparent opacity={0.1}/>
                </mesh>
            </RigidBody>

            {/* Правая стена */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[size / 2, height / 2, 0]}>
                    <boxGeometry args={[0.2, height, size]}/>
                    <meshStandardMaterial color="gray" transparent opacity={0.1}/>
                </mesh>
            </RigidBody>

            {/* Задняя стена */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, height / 2, -(size / 2)]}>
                    <boxGeometry args={[size, height, 0.2]}/>
                    <meshStandardMaterial color="gray" transparent opacity={0.1}/>
                </mesh>
            </RigidBody>

            {/* Передняя стена */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, height / 2, size / 2]}>
                    <boxGeometry args={[size, height, 0.2]}/>
                    <meshStandardMaterial color="gray" transparent opacity={0.1}/>
                </mesh>
            </RigidBody>

            {/* Потолок */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh position={[0, height, 0]}>
                    <boxGeometry args={[size, 0.2, size]}/>
                    <meshStandardMaterial color="gray" transparent opacity={0.05}/>
                </mesh>
            </RigidBody>
        </>
    );
}