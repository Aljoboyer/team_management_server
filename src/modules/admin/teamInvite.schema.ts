import mongoose, { Schema, model } from "mongoose"
import { IInviteMember } from "./admin.interface";


export const TeamInviteSchema = new Schema<IInviteMember>({
    email:  {
        type: String,
    },
    name: {
        type: String,
    },
    teamDetails:{
        type: Schema.Types.ObjectId,
        ref: 'Team'
       },
    teamUserTitle: {
        type: String,
    },
    teamRole: {
        type: String,
    },
    status: {
        type: String,
    },
    expireToTime: {
        type: String,
    },
    expireFromTime: {
        type: String,
    },

},{
    timestamps: true
})
 
export const TeamMember =  mongoose.model<IInviteMember>("TeamMember", TeamInviteSchema);