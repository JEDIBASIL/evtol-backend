import { NextFunction, Request, Response } from "express";
import { AdminLoginDto } from "../dto/admin.dto";
import JwtToken from "../utils/token";
import HttpResponse from "../response/HttpResponse";
import AdminService from "../services/admin.service";
import { v4 } from "uuid";
import { cloudinary } from "../config";
import EvoltService from "../services/evolt.service";
import { AddEvoltDto } from "../dto/evolt.dto";
import logger from "../utils/logger";

class AdminController {
    private serviceA = new AdminService();
    private serviceE = new EvoltService();

    private jwt = new JwtToken()

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password }: AdminLoginDto = req.body
            const admin = await this.serviceA.loginAccount({ password, username })
            if (admin) {
                const accessToken = this.jwt.signJwt(admin.username, "30d")
                return res.status(200).send(new HttpResponse("success", "account authenticated", { accessToken }))
            }
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }

    uploadImg = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            return res.status(200).send(new HttpResponse("success", "image uploaded", { url: req.file?.path }))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }

    addEvolt = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const data: AddEvoltDto = req.body
            const newEvolt = await this.serviceE.addEvolt(data)
            return res.status(200).send(new HttpResponse("success", "evtol added successfully", newEvolt))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }

    getAllEvolt = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            return res.status(200).send(new HttpResponse("success", "all evtol", await this.serviceE.getAllEvolt()))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }

    getEvolt = async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            return res.status(200).send(new HttpResponse("success", "gotten evtol", await this.serviceE.getEvolt(id)))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
}

export default AdminController