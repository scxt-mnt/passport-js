import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

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
    }, (accessToken, refreshToken, profile, done) => {
        // passport call back fucntion
        console.log(profile);
    }
    ))

    export default passport