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
            await nameUser.save();
            return done(null, nameUser);
        } catch (e) { 
            console.log(e.message);
            return done(e);
        }
    }
    ))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const foundUser = await user.findById(id);
        done(null, foundUser);
    } catch (e) {
        done(e);
    }
});

export default passport