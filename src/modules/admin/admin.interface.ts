import { Types } from "mongoose";

export interface ICreateTeam {
    teamName: string,
    category: string,
    createdBy: Types.ObjectId
}

export interface IInviteMember{
    email: string,
    name: string,
    teamDetails:Types.ObjectId,
    teamUserTitle: string,
    teamRole: string
    status: string,
    expireToTime: string,
    expireFromTime: string
}