import mongoose from "mongoose";
import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';
import config from "../config/config";
import express, {Response, Request} from 'express';

const app = express()

const connectDB = () => {
  const mongouri = `${config.database_url}`;
  const options: MongoClientOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
       // version: ServerApiVersion.v1,
  };

  try {
       mongoose.connect( 
      mongouri,
      options
    );
    console.log("connected to database")

  } catch (error) {
    console.log(error);
 
  } 
};

export default connectDB; 