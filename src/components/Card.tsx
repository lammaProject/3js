import {useState, useRef, type Dispatch, type SetStateAction, useEffect} from 'react';
import {useLoader} from '@react-three/fiber';
import {TextureLoader, Mesh} from 'three';
import {RigidBody, RapierRigidBody} from '@react-three/rapier';
import {animated} from '@react-spring/three';

interface CardProps {
    frontImage: string;
    backImage?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    rigidBodyType?: "fixed" | "dynamic" | "kinematicPosition" | "kinematicVelocity";
    cardIndex: number;
    selectCard: Dispatch<SetStateAction<CardProps[] | null>>;
    inProcess: boolean;
    name: string;
    description: string;
    isSelected: boolean;
}

function Card({
                  frontImage,
                  backImage,
                  position = [0, 0, 0],
                  rotation = [0, 0, 0],
                  selectCard,
                  inProcess,
                  isSelected,
                  name, description
              }: CardProps) {
    const [hovered, setHovered] = useState<boolean>(false);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const cardRef = useRef<Mesh>(null);
    const bodyRef = useRef<RapierRigidBody>(null);

    useEffect(() => {
        if (!inProcess) {
            setIsFlipped(false)
        }
    }, [inProcess]);

    const frontTexture = useLoader(TextureLoader, frontImage);
    const backTexture = useLoader(TextureLoader, backImage || '/assets/side.png');

    const handlePointerEnter = (e: any) => {
        e.stopPropagation();
        if (!isFlipped) setHovered(true);
    };

    const handlePointerLeave = (e: any) => {
        e.stopPropagation();
        setHovered(false);
    };

    const handleClick = (e: any) => {
        e.stopPropagation();

        if (isFlipped && bodyRef.current) {
            // Для поворота используем setRotation с кватернионом
            // Конвертируем углы Эйлера в кватернион
            const euler = {x: 0.17, y: 0.17, z: 0.17}; // ~10 градусов в радианах

            // Простой способ - используем импульс для вращения
            bodyRef.current.setAngvel({x: 5, y: 0, z: 20}, true);

            // Или устанавливаем поворот напрямую (кватернион)
            // bodyRef.current.setRotation({ x: 0.1, y: 0.1, z: 0.1, w: 0.98 }, true);

            return;
        }
        if (!isFlipped && inProcess) {
            setIsFlipped(true);

            if (bodyRef.current) {
                selectCard((prev) => prev ? [...prev, {name, description}] : [{name, description}]);

                // Сначала телепортируем карту наверх
                bodyRef.current.setTranslation({x: 0, y: 2, z: -1}, true);
                bodyRef.current.setRotation({x: 0, y: 0, z: 0, w: 1}, true);

                // Оставляем динамическую физику
                bodyRef.current.setBodyType(0); // dynamic
            }
        }
    };

    return (
        <RigidBody
            ref={bodyRef}
            position={position}
            rotation={isFlipped ? [0, 0, 0] : rotation}
            friction={0.8}
            restitution={0.1}
            linearDamping={0.95}
            angularDamping={0.95}
        >
            <animated.mesh
                ref={cardRef}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                onClick={handleClick}
            >
                <boxGeometry args={[2, 3, 0.05]}/>
                {[...Array(6)].map((_, index) => (
                    <meshStandardMaterial
                        key={index}
                        attach={`material-${index}`}
                        map={index === 4 ? frontTexture : backTexture}
                        roughness={0.4}
                        metalness={0.1}
                        emissive={
                            isFlipped ? isSelected ? "#000000" : "#00ff00" :
                                hovered ? "#444444" : "#000000"
                        }
                        emissiveIntensity={
                            isFlipped ? 0.2 :
                                hovered ? 0.3 : 0
                        }
                    />
                ))}
            </animated.mesh>
        </RigidBody>
    );
}

export {Card}