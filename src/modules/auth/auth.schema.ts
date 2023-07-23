import mongoose, { Schema, model } from "mongoose"
import { IUser } from "./auth.interface";


export const TeamUserSchema = new Schema<IUser>({
    email: {
        type: String,
    },
    role:  {
        type: String,
        enum : ['admin','user'],
    }, 
    password:  {
        type: String,
    },
    name: {
        type: String,
    },
    createdAt:  {
        type: String,
    },
    updatedAt:  {
        type: String,
    }
},{
    timestamps: true
})
 
export const TeamUser =  mongoose.model<IUser>("TeamUser", TeamUserSchema);
