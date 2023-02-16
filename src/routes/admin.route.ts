import { Router } from "express";
import IRoute from "../interfaces/route.interface";
import AdminController from "../controllers/admin.controller";
import AdminAuth from "../auth/admin.auth";
import ErrorMessage from "../enums/error.message.enum";
import dtoValidationMiddleware from "../middleware/dto.validator.middleware";
import { AdminLoginDto } from "../dto/admin.dto";
import { imageParser } from "../config";
import { AddEvoltDto } from "../dto/evolt.dto";

class AdminRoute implements IRoute {
    path: string = "/admin";
    route: Router = Router();
    private controller = new AdminController()
    constructor() {
        this.initializeRoute()
    }
    private initializeRoute() {
        this.route.post(
            `${this.path}/login`,
            dtoValidationMiddleware(AdminLoginDto, "body", ErrorMessage.FIELDS),
            this.controller.login
        )

        this.route.get(
            `${this.path}/evolt`,
            AdminAuth.check,
            AdminAuth.isSuper,
            this.controller.getAllEvolt
        )

        this.route.get(
            `${this.path}/evolt/:id`,
            AdminAuth.check,
            AdminAuth.isSuper,
            this.controller.getEvolt
        )

        this.route.post(
            `${this.path}/evolt`,
            AdminAuth.check,
            AdminAuth.isSuper,
            dtoValidationMiddleware(AddEvoltDto, "body", ErrorMessage.FIELDS),
            this.controller.addEvolt
        )

        this.route.post(
            `${this.path}/image`,
            AdminAuth.check,
            AdminAuth.isSuper,
            imageParser.single("img"),
            this.controller.uploadImg
        )
    }
}

export default AdminRoute