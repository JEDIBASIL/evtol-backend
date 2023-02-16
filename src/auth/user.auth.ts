import BaseAuth from "./base.auth";
import { NextFunction, Request, Response } from 'express';
import { Model, Document } from 'mongoose';
import  IUser  from "../interfaces/user.model";
import userModel from "../model/user.model";
import HttpException from "../error/HttpException";

class UserAuth extends BaseAuth {
    private model: Model<Document<any, any, any> & IUser, {}, {}, {}, any>;
    constructor(req: Request, res: Response) {
        super(req, res)
        this.model = userModel
    }
    static async createInstance(req: Request & any, res: Response, next: NextFunction) {
        try {
            const user = await new UserAuth(req, res).isExist();
            req["user"] = user;
            return next()
        } catch (e) {
            next(e);
        }
    }
    async isExist() {
        const user = await this.model.findOne({ email: this.value })
        if (!user) throw new HttpException(409, "account not found")
        return user
    }
}

export default UserAuth;