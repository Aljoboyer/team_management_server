import {Request, Response} from 'express'
import { Team } from './createTeam.schema';

export const createTeamController = async (req: Request, res: Response) => {
  // console.log('Hitted', req.body)
    const teamsData = req.body;

    try {
      const teamExists = await Team.findOne({ teamName: teamsData?.teamName });
  
      if (teamExists) {
        return res.status(400).json({ message: "Team name already exists. Please try unique name" });
      }
      else{
        const result = await Team.create(teamsData);
          res.status(201).json({status: 200, message: 'Team Created successfully'});
      }

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

  export const getAllTeams = async (req: Request, res: Response) => {
  
      try {
        const teams = await Team.find({  }).populate('createdBy');
    
        res.send(teams)
  
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
      }
    };