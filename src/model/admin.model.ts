import { CallbackWithoutResultAndOptionalError, Schema, model,Document } from "mongoose";
import IAdmin from "../interfaces/admin.model";
import bcrypt from "bcrypt"


const adminSchema = new Schema<IAdmin>({
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

adminSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

adminSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

const AdminModel = model<Document & IAdmin>('admin', adminSchema);
export default AdminModel;