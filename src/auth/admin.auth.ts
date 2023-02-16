import { Model, Document } from "mongoose";
import HttpException from "../error/HttpException";
import BaseAuth from "./base.auth";
import { NextFunction, Request, Response } from 'express';
import adminModel from "../model/admin.model";
import  IAdmin  from "../interfaces/admin.model";
import logger from "../utils/logger";

class AdminAuth extends BaseAuth {
    private model:Model<Document & IAdmin, {}, {}, {}, any>;
    constructor(req: Request, res: Response) {
        super(req, res)
        this.model = adminModel;
    }
    static async createInstance(req: Request & any, res: Response, next: NextFunction) {
        try {
            const admin = await new AdminAuth(req, res).isExist();
            req["admin"] = admin;
            return next()
        } catch (e) {
            next(e);
        }
    }
    static async isSuper(req: Request & any, res: Response, next: NextFunction) {
        try {
            const admin = await new AdminAuth(req, res).isExist();
            req["admin"] = admin;
            return next()
        } catch (e) {
            next(e);
        }
    }
    async isExist() {
        logger.info(this.value)
        const admin = await this.model.findOne({ username: this.value })
        if (!admin) throw new HttpException(409, "account not found")
        return admin
    }
}

export default AdminAuth