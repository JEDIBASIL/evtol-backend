import { Schema } from "mongoose";

interface IMedication {
    user: Schema.Types.ObjectId;
    evtol: Schema.Types.ObjectId;
    name: string;
    code: string;
    image: string;
    weight: number;
    delivered:boolean
}

export default IMedication