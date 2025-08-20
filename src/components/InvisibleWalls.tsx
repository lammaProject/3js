import {RigidBody} from "@react-three/rapier";

const DebugWalls = () => {
    const boundarySize = 15;
    const wallHeight = 6;
    const wallThickness = 0.5;

    return (
        <group>
            {/* Север - красный */}
            <RigidBody type="fixed" position={[0, wallHeight / 2, 5]}>
                <mesh>
                    <boxGeometry args={[boundarySize, wallHeight, wallThickness]}/>
                    <meshStandardMaterial transparent opacity={0}/>
                </mesh>
            </RigidBody>

            {/* Юг - синий */}
            <RigidBody type="fixed" position={[0, wallHeight / 2, -5]}>
                <mesh>
                    <boxGeometry args={[boundarySize, wallHeight, wallThickness]}/>
                    <meshStandardMaterial color="blue" transparent opacity={0}/>
                </mesh>
            </RigidBody>

            {/* Запад - зеленый */}
            <RigidBody type="fixed" position={[-5, wallHeight / 2, 0]}>
                <mesh>
                    <boxGeometry args={[wallThickness, wallHeight, boundarySize]}/>
                    <meshStandardMaterial color="green" transparent opacity={0}/>
                </mesh>
            </RigidBody>

            {/* Восток - желтый */}
            <RigidBody type="fixed" position={[5, wallHeight / 2, 0]}>
                <mesh>
                    <boxGeometry args={[wallThickness, wallHeight, boundarySize]}/>
                    <meshStandardMaterial color="yellow" transparent opacity={0}/>
                </mesh>
            </RigidBody>
        </group>
    );
};

export {DebugWalls}