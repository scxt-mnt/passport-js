import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import user from '../../models/user.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT;
const DB_URL = process.env.APP_URL;
const SECRET = process.env.SECRET;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


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

    })
    .catch((err) => { console.log(err) });




app.post('/api/user', async (req, res) => {
    try {
        const storeData = await user.create(req.body);
        res.status(200).json({ msg: "successfully sent", content: storeData });
    } catch (err) {
        res.status(500).send(err);
    }
})


app.get('/home', (req, res) => {
    
    if(req.session.viewCount){
        req.session.viewCount = (req.session.viewCount || 0) + 1;
    }else{
        req.session.viewCount = req.session.viewCount + 1;
    }
    req.session.save(err => {
        if(err) {
            return res.status(500).send("Session error");
        }
        res.send(`<h1>Hello world</h1><p>Views: ${req.session.viewCount}</p>`);
    });
});
