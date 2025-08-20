// App.jsx
import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Physics, type RigidBodyTypeString} from "@react-three/rapier";
import Table from "./components/Table.tsx";
import {Card} from "./components/Card.tsx";
import {Button} from "./components/Button.tsx";
import {type FormEvent, type FormEventHandler, useEffect, useState} from "react";
import {CARDS} from "./data/cardData.ts";
import {DebugWalls} from "./components/InvisibleWalls.tsx";
import {Modal} from "./components/Modal.tsx";
import {api} from "./api/api.ts";
import parse from 'html-react-parser';

export interface CardProps {
    name: string;
    description: string;
}

function App() {
    const [inProcess, setInProcess] = useState(false);
    const [selected, setSelected] = useState<CardProps[] | null>(null);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [isModalClose, setIsModalClose] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>(null);

    useEffect(() => {
        if (selected?.length === 3) {
            return setIsModalClose(true)
        }
        if (inProcess && !selected) {
            setIsModal(true);
        }

    }, [inProcess, selected]);

    const handleClick = () => {
        setIsModal(false)
    }

    const handleSubmit = async () => {
        console.log(text, selected)
        if (selected) {
            const data = await api({text, cards: selected})
            console.log(data)
            setResponseData(data?.answer?.reading)
        }
    }

    const handleCloseAnswer = () => {
        setIsModalClose(false);
        setSelected(null)
        
        setInProcess(false)
        setIsModal(false)
    }

    return (
        <>
            <Canvas style={{width: "100vw", height: "100vh"}}>
                {/* Камера сверху под углом, ближе к столу */}
                <PerspectiveCamera
                    makeDefault
                    position={[0, 4, 8]}  // Ближе и ниже
                    rotation={[-0.3, 0, 0]}  // Смотрит вниз под углом
                    fov={60}
                />

                <Physics gravity={[0, -9.81, 0]}>
                    {CARDS.map((card, index) => {
                        let position, rotation;
                        let isSelected = false;

                        if (inProcess) {
                            const totalCards = CARDS.length;
                            const maxSpread = 3; // Максимальное расстояние от центра
                            const cardSpacing = (maxSpread * 2) / (totalCards - 1); // Равномерное распределение

                            position = [
                                -maxSpread + index * cardSpacing, // От -3 до 3
                                2, // Достаточная высота для падения
                                0 // Все карты на одной линии
                            ];

                            rotation = [
                                Math.PI / 2,
                                0,
                                0
                            ];

                        } else {
                            position = [0, 5 + index * 0.5, 0];
                            rotation = [0, Math.PI, 0];
                        }

                        if (selected?.length > 2) {
                            isSelected = true
                        }

                        if (selected?.length > 2 && !selected?.some(item => item.name === card.name)) {
                            position = [0, 0, -10]
                        }

                        return (
                            <Card
                                key={index}
                                frontImage={card.src}
                                position={position}
                                rotation={rotation}
                                inProcess={inProcess}
                                selectCard={setSelected}
                                cardIndex={index}
                                name={card.name}
                                description={card.description}
                                isSelected={isSelected}
                            />
                        );
                    })}
                    <DebugWalls/>
                    {!inProcess && <Button changeProcess={setInProcess}/>}
                    <Table/>
                </Physics>

                <ambientLight intensity={0.6}/>
                <directionalLight
                    position={[5, 10, -3]}
                    intensity={0.8}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <OrbitControls autoRotate={false} autoRotateSpeed={0.4} enableRotate={true} enableZoom={false}/>
            </Canvas>
            <Modal isOpen={isModal}>
                <div
                    className={'w-[500px] rounded-2xl flex flex-col scroll-none p-4 h-[500px] bg-white/30 backdrop-invert backdrop-opacity-10'}>
                    <h1 className={'mb-2 text-center'}>Нашептать колоде</h1>
                    <textarea maxLength={150} rows={7} onChange={e => setText(e.target.value)}
                              className={'w-full overscroll-none bg-white/30 backdrop-invert backdrop-opacity-60 rounded-2xl p-5 text-4xl'}/>
                    <button onClick={handleClick} className={'w-full mt-auto'}>Отправить</button>
                </div>
            </Modal>

            <Modal isOpen={isModalClose}>
                <div
                    className={'w-full rounded-2xl flex flex-col scroll-none p-4 h-[500px] overflow-y-auto bg-white/30 backdrop-invert backdrop-opacity-10'}>
                    {parse(responseData ?? '')}
                    <button onClick={handleSubmit} className={'w-full mt-auto'}>Узнать что сказали карты</button>
                    <button onClick={handleCloseAnswer}>close</button>
                </div>
            </Modal>
        </>
    );
}

export default App;