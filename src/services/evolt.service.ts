// add evolt
// delete evolt
// get all evolt
// get each evolt
// load evolt

import { Document } from "mongoose";
import HttpException from "../error/HttpException";
import IEvolt from "../interfaces/evolt.interface";
import evoltModel from "../model/evolt.model";
import State from "../enums/state.enums";
import { AddEvoltDto } from "../dto/evolt.dto";
import Model from "../enums/model.enums";


class EvoltService {
    private modelE = evoltModel
    async findEvolt(serialNumber: string): Promise<IEvolt & Document> {
        const foundEvolt = await this.modelE.findOne({ serialNumber })
        if (!foundEvolt) throw new HttpException(404, "evolt not found")
        return foundEvolt
    }

    async getEvolt(serialNumber: string): Promise<IEvolt> {
        return await this.findEvolt(serialNumber)
    }

    async loadEvolt(): Promise<IEvolt> {
        const freeEvolt = await this.modelE.findOne({ batteryPercentage: { $gt: 25 }, state: State.IDLE })
        if (!freeEvolt) throw new HttpException(404, "no free evolt")
        return freeEvolt

    }

    async getAllEvolt(): Promise<IEvolt[]> {
        return await this.modelE.find()
    }

    async addEvolt(newEvolt: AddEvoltDto): Promise<IEvolt> {

        const evolt = { ...newEvolt } as any
        if (newEvolt.weightLimit >= 100 && newEvolt.weightLimit <= 200) evolt.model = Model.Lightweight
        if (newEvolt.weightLimit >= 201 && newEvolt.weightLimit <= 300) evolt.model = Model.Middleweight
        if (newEvolt.weightLimit >= 301 && newEvolt.weightLimit <= 400) evolt.model = Model.Cruiserweight
        if (newEvolt.weightLimit >= 401 && newEvolt.weightLimit <= 500) evolt.model = Model.Heavyweight

        return await this.modelE.create({ ...evolt })
    }
}

export default EvoltService;