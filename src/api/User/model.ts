import { Document, model, Schema } from "mongoose";
import { compareHash, encrypt } from "../../services/bcrypt";

export interface IUser extends Document {
    username: string,
    password: string
}

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true })

const onNew = async (user: IUser) => {
    if (!user.isModified("password")) return null;

    // New user
    const hash = await encrypt(user.password);
    user.password = hash;

    return null
}

userSchema.pre<IUser>('save', async function (next) {
    await onNew(this);

    next();
});


export default model<IUser>("User", userSchema);