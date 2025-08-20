import axios from "axios";
import type {CardProps} from "../App.tsx";

export const api = async (body: { cards: Array<CardProps> } & { text: string }) => {
    const {data} = await axios.post('https://api-worker.akhmetovrustam1990.workers.dev/taro', body, {
        headers: {
            Authorization: "Bearer Taiberium:TxVHEUqLd0KWRp9U8XzSom6JH"
        }
    })
    return data;
}