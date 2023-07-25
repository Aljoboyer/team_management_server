import {Request, Response} from 'express'
import { Team } from './createTeam.schema';
import { IUser } from '../auth/auth.interface';
import { ObjectId } from 'mongodb';
import { TeamUser } from '../auth/auth.schema';
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SecretKey = "te@mM@n@gement";

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
    // console.log('Hitted all ', req)
    const token = req.headers['x-access-token'];
    // console.log('Hitted all ', token)
      try {
        
        
        if (!token) {
          console.log('not found e dukse')
          return res.status(401).json({ error: 'Missing token' });
        }
      
        jwt.verify(token, SecretKey, async (err: any, user: any) => {
          if (err) {
            return res.status(403).json({ error: 'Invalid token' });
          }

          const teams = await Team.find({ createdBy: new ObjectId(user.id) }).populate('createdBy');
          res.send(teams)
        });
  
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
      }
    };

export const getAllUser = async (req: Request, res: Response) => {

        try {
          const userData = await TeamUser.find({  });
          res.send(userData)
    
        } catch (error) {
          res.status(500).json({ message: "Something went wrong" });
          console.log(error);
        }
      };