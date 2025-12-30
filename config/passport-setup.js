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
    }, function (accessToken, refreshToken, profile, done) {
        // passport callback function
        user.findOne({ googleId: profile.id })
            .then((newUser) => {
                if (newUser) {
                    //user exist
                    console.log("user exist " + newUser.name);
                    return done(null, newUser.googleId)
                } else {
                    new user({ name: profile.name.givenName, googleId: profile.id }).save()
                        .then((data) => { console.log("user saved " + data.name), done(null, data.googleId) })
                        .catch((err) => { console.log(err), done(err) });
                }
            })
    }
    ))

export default passport