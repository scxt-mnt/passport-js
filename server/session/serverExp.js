import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import router from '../../routes/auth-routes.js'
import passport from 'passport';
import '../../config/passport-setup.js';
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT;
const DB_URL = process.env.APP_URL;
const SECRET = process.env.SECRET;

//middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.use('/auth', router);


const sessionStore = MongoStore.create({
    mongoUrl: DB_URL,
    collectionName: "sessions"
});

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


mongoose.connect(DB_URL)
    .then(() => {
        app.listen(PORT, () => console.log("listening to port " + PORT))
    }).catch((err) => { console.log(err) });





