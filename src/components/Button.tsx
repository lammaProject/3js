import {RigidBody} from "@react-three/rapier";
import {Box, Text} from "@react-three/drei";
import {type Dispatch, type SetStateAction, useState} from "react";

interface Props {
    changeProcess: Dispatch<SetStateAction<boolean>>
}

export const Button = ({changeProcess}: Props) => {
    const [hover, setHover] = useState(false);

    const handlePointerEnter = (e) => {
        e.stopPropagation(); // Останавливаем распространение
        setHover(true);
    };

    const handlePointerLeave = (e) => {
        e.stopPropagation();
        setHover(false);
    };

    const handleClick = () => {
        changeProcess(() => true)
    }

    return <RigidBody position={[4, 4, 2]}>
        <Box material-color={!hover ? "hotpink" : 'pink'} onClick={handleClick} onPointerEnter={handlePointerEnter}
             onPointerLeave={handlePointerLeave}
             onPointerOver={handlePointerEnter}
             onPointerOut={handlePointerLeave}/>
        <Text
            position={[0, 0, 0.51]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
        >
            расклад
        </Text>
    </RigidBody>
}