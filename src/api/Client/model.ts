import { Document, model, Schema } from "mongoose";

export interface IClient extends Document {
    name: string,
    lastname: string,
    age: number,
    latitude: number,
    longitude: number,
    hotspot_asteroids: number,
    price: number
}

const clientSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    hotspot_asteroids: { type: Number, required: false },
    price: { type: Number, required: false },

}, { timestamps: true })

export default model<IClient>("Client", clientSchema);