import mongoose, { Schema, model } from "mongoose"
import { ICreateTeam } from "./admin.interface";


export const TeamSchema = new Schema<ICreateTeam>({
    teamName: {
        type: String,
    },
    category:  {
        type: String,
    }
},{
    timestamps: true
})
 
export const Team =  mongoose.model<ICreateTeam>("Team", TeamSchema);
