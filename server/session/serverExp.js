import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from '../../routes/auth-routes.js'
import passport from 'passport';
import cookieSession from 'cookie-session';
import '../../config/passport-setup.js';

dotenv.config();

const app = express();


const PORT = process.env.APP_PORT;
const DB_URL = process.env.APP_URL;
const SECRET = process.env.SECRET;
const sessionKey = process.env.sessionKey;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.use(cookieSession({
    maxAge:  1000 * 60  * 60  *  24,
    keys: [sessionKey]
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', router);


mongoose.connect(DB_URL)
    .then(() => {
        console.log("mongoDb connected!");
        app.listen(PORT, () => console.log("listening to port " + PORT))
    }).catch((err) => { console.log(err.message) });





