import { Schema, model } from "mongoose";
import { v4 } from "uuid"
import IMedication from "../interfaces/medication.interface";

const medicationSchema = new Schema<IMedication>({
    code: {
        type: String,
        default: v4()
    },
    delivered: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
    evtol: {
        type: Schema.Types.ObjectId,
        ref: "evolt",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "evolt",
        required: true
    },
})

const medicationModel = model<Document & IMedication>("medication", medicationSchema)
export default medicationModel