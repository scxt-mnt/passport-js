import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import user from '../../models/user.js';
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT;
const DB_URL = process.env.APP_URL;

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(DB_URL)
    .then(() => app.listen(PORT, () => console.log("listening to port " + PORT)))
    .catch((err) => { console.log(err) });



app.post('/api/user', async (req, res) => {
    try {
        const storeData = await user.create(req.body);
        res.status(200).json({ msg: "successfully sent", content: storeData });
    } catch (err) {
        res.status(500).send(err);
    }
})