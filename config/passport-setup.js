import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import user from '../models/user.js';


dotenv.config();

const CLIENTID = process.env.ClientId;
const CLIENTSECRET = process.env.ClientSecret;
const CALLBACKURL = process.env.callbackURL;


console.log(CLIENTID);

passport.use(
    new GoogleStrategy({
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL: CALLBACKURL
    }, async function (accessToken, refreshToken, profile, done) {
        // passport call back function
        try {
            const nameUser = new user({ name: profile.name.givenName });
            await nameUser.save()
            .then(console.log("successfully saved")
            .catch("didnt been saved"));
        } catch (e) { console.log(e.message) };
    }
    ))

export default passport