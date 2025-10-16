import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT;
const DB_URL = process.env.APP_URL;


mongoose.connect(DB_URL)
.then(() => console.log("connected to db"))
.catch((err) => {console.log(err)});
app.listen(PORT, () => console.log("listening to port " + PORT));

