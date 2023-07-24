import {Request, Response} from 'express'
import { TeamUser } from './auth.schema';
import { IUser } from './auth.interface';
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SecretKey = "te@mM@n@gement";

export const signInHandler = async (req: Request, res: Response) => {
  // console.log('Hitted signing', req.body)
  const { email, password } = req.body; 

  try {
    const oldUser = await TeamUser.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Your Password is wrong" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SecretKey,  {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// User Signup
export const userSignUpController = async (req: Request, res: Response) => {
  console.log('Hitted', req.body)
    const { email, password, name } = req.body;

    try {
      const oldUser = await TeamUser.findOne({ email: email });
  
      if (oldUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await TeamUser.create({
        email: email,
        password: hashedPassword,
        name: name,
      });
  
    const token = jwt.sign({ email: result.email, id: result._id }, SecretKey ,{
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

export const getUserController = async (req: Request, res: Response) => {
  // console.log('Hitted broo', req.query)

  const {token} = req.query;

  if (!token) {
    console.log('not found e dukse')
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, SecretKey, (err: any, user: IUser) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
   res.send(user)
  });
}

function authenticateToken(req: Request, res: Response, next: any) {
  // console.log('Hitted broo', req)
  const authHeader = req.headers.authorization;
  const token = req.headers.authorization;

  if (!token) {
    console.log('not found e dukse')
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, SecretKey, (err: any, user: IUser) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    // req.user = user;
    next();
  });
}
