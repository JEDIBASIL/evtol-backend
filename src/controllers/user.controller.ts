import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { CreateAccountDto, LoginDto } from "../dto/user.dto";
import HttpResponse from "../response/HttpResponse";
import JwtToken from "../utils/token";
import HttpException from "../error/HttpException";

class UserController {
    private service = new UserService()
    private jwt = new JwtToken()

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password }: LoginDto = req.body
            const admin = await this.service.loginAccount({ password, email })
            if (admin) {
                const accessToken = this.jwt.signJwt(admin.email, "30d")
                return res.status(200).send(new HttpResponse("success", "account authenticated", { accessToken }))
            }
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }

    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateAccountDto = req.body;
            const { email } = data
            const accessToken = this.jwt.signJwt(email, "30d");
            const newAccount = await this.service.createAccount(data);
            if (!newAccount) return res.status(500).send(new HttpResponse("failed", "an error occurred"))
            return res.status(200).send(new HttpResponse("success", "account created successfully", { accessToken }))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
}

export default UserController