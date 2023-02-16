import { Document } from "mongoose";
import { CreateAccountDto, LoginDto } from "../dto/user.dto";
import HttpException from "../error/HttpException";
import IUser from "../interfaces/user.model";
import userModel from "../model/user.model";

class UserService{
    private modelU = userModel;

    async findByEMail(email: string): Promise<IUser & Document> {
        const foundUser = await this.modelU.findOne({ email })
        if (!foundUser) throw new HttpException(404, "user not found")
        return foundUser
    }

    async createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto> {
        const searchedEmail = await this.findByEMail(newUser.email)
        if (searchedEmail) throw new HttpException(409, "email taken")
        const newAccount = await this.modelU.create({ ...newUser })
        return newAccount;
    }

    async loginAccount(credentials: LoginDto): Promise<IUser> {
        const { password, email } = credentials
        const findByUsernameOrEmail = await this.modelU.findOne({ email}).select("+password")
        if (!findByUsernameOrEmail) throw new HttpException(404, "incorrect username or email, and password")
        if (!findByUsernameOrEmail.isPasswordMatch(password)) throw new HttpException(404, "incorrect username or email, and password")
        return findByUsernameOrEmail;
    }
}

export default UserService;