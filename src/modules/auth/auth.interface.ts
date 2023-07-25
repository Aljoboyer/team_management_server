import { ObjectId } from "mongodb";
import { Types } from "mongoose";

export interface IUser {
    email: string,
    role: string, 
    password: string,
    name: string,
    profileImg: string
}