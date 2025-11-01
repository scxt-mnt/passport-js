import passport from 'passport';
import googleStrategy from 'passport-google-oauth';
import dotenv from 'dotenv';

dotenv.config();

const CLIENTID = process.env.ClientId;
const CLIENTSECRET = process.env.ClientSecret;

console.log(CLIENTID);

passport.use(
    new googleStrategy({
    // client id and secrets
}), () => {
    // passport call back fucntion
})