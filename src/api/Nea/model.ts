import { Document, model, Schema } from "mongoose";

export interface INea extends Document {
    full_name: string,
    a: number,
    e: number,
    i: number,
    om: number,
    w: number,
    ma: number
}

const neaSchema = new Schema({
    full_name: { type: String, required: true },
    a: { type: Number, required: true },
    e: { type: Number, required: true },
    i: { type: Number, required: true },
    om: { type: Number, required: true },
    w: { type: Number, required: true },
    ma: { type: Number, required: true }
}, { timestamps: true })

export default model<INea>("Nea", neaSchema);