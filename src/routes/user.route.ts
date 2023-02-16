import { Router } from "express";
import IRoute from "../interfaces/route.interface";
import UserController from "../controllers/user.controller";
import dtoValidationMiddleware from "../middleware/dto.validator.middleware";
import { CreateAccountDto, LoginDto } from "../dto/user.dto";
import ErrorMessage from "../enums/error.message.enum";

class UserRoute implements IRoute {
    path: string = "/user";
    route: Router = Router();

    private controller = new UserController()
    constructor() {
        this.initializeRoute()
    }
    private initializeRoute() {
        this.route.post(
            `${this.path}/create`,
            dtoValidationMiddleware(CreateAccountDto, "body", ErrorMessage.FIELDS),
            this.controller.createAccount
        )

        this.route.post(
            `${this.path}/login`,
            dtoValidationMiddleware(LoginDto, "body", ErrorMessage.FIELDS),
            this.controller.login
        )
    }
}

export default UserRoute