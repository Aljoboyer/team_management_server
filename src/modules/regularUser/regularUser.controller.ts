import {Request, Response} from 'express'
import { ObjectId } from 'mongodb';
import { TeamMember } from '../admin/teamInvite.schema';
import { Types } from 'mongoose';

export const statusChangeController = async (req: Request, res: Response) => {

      const {id, status} = req.body;
  
      try {
        const TeamMemberData: any = await TeamMember.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: {status: status} },
          
            { new: true }
            )
        res.send({status: 200, message: 'Updated Successfully'})
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
      }
};

export const getIndividualTeamDataController = async (req: Request, res: Response) => {

  const  id: any = req.query.id

  try {
    const TeamMemberData: any = await TeamMember.find({teamDetails: new ObjectId(id)}).populate({
      path: 'teamDetails', 
      populate: {
        path: 'createdBy',
      }})
    res.send(TeamMemberData)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }

}
