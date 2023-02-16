import { Schema, model } from "mongoose";
import IEvolt from "../interfaces/evolt.interface";
import { v4 } from "uuid"
import State from "../enums/state.enums";
import Model from "../enums/model.enums";

const evoltSchema = new Schema<IEvolt>({
    serialNumber: {
        type: String,
        default: v4()
    },
    batteryPercentage: {
        type: Number,
        default: 100
    },
    img: {
        type: String
    },
    state: {
        type: String,
        default: State.IDLE
    },
    model: {
        type: String,
        required:true
    },
    weightLimit: {
        type: Number,
        required: true
    },

})

const evoltModel = model<Document & IEvolt>("evolt", evoltSchema)
export default evoltModel