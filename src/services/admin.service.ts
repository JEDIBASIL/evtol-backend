import { Document } from "mongoose";
import HttpException from "../error/HttpException";
import adminModel from "../model/admin.model";
import IAdmin from "../interfaces/admin.model";
import { AdminLoginDto } from "../dto/admin.dto";

class AdminService{
    private modelA = adminModel;

    async findByEMail(email: string): Promise<IAdmin & Document> {
        const foundUser = await this.modelA.findOne({ email })
        if (!foundUser) throw new HttpException(404, "user not found")
        return foundUser
    }

    // async createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto> {
    //     const searchedEmail = await this.findByEMail(newUser.email)
    //     if (searchedEmail) throw new HttpException(409, "email taken")
    //     const newAccount = await this.modelU.create({ ...newUser })
    //     return newAccount;
    // }

    async loginAccount(credentials: AdminLoginDto): Promise<IAdmin> {
        const { password, username } = credentials
        const findByUsername = await this.modelA.findOne({ username}).select("+password")
        if (!findByUsername) throw new HttpException(404, "incorrect username or email, and password")
        if (!findByUsername.isPasswordMatch(password)) throw new HttpException(404, "incorrect username or email, and password")
        return findByUsername;
    }
}

export default AdminService;