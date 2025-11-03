import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send("<h1>redirected to callback</h1>")
})


export default router;