import { CallbackWithoutResultAndOptionalError, Schema, model,Document } from "mongoose";
import IUser from "../interfaces/user.model";
import bcrypt from "bcrypt"


const userSchema = new Schema<IUser>({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

const userModel = model<Document & IUser>('User', userSchema);
export default userModel;