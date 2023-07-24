import { Types } from "mongoose";

export interface ICreateTeam {
    teamName: string,
    category: string,
    createdBy: Types.ObjectId
}