import { Document, model, Schema } from "mongoose";

export interface IClient extends Document {
    Name: string,
    Lastname: string,
    Age: number,
    Latitude: number,
    Longitude: number,
    Hotspot_asteroids: number,
    Price: number
}

const clientSchema = new Schema({
    Name: { type: String, required: true },
    Lastname: { type: String, required: true },
    Age: { type: Number, required: true },
    Latitude: { type: Number, required: false },
    Longitude: { type: Number, required: false },
    Hotspot_asteroids: { type: Number, required: false },
    Price: { type: Number, required: true },
    
}, { timestamps: true })

export default model<IClient>("Client", clientSchema);