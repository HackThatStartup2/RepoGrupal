import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from '../../api/User/model';

const express = require('express');
const app = express();
const passport = require('passport');
const GITHUB_CLIENT_ID = "dd04c96a6b104b9746c6";
const GITHUB_CLIENT_SECRET = "40c8010a6c4e5239e988faffd9529cfeaf8b6da9";
const GitHubStrategy = require("passport-github2").Strategy;


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);  
    cb(null, profile);
  }
));

//auth
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (error) {
        console.log(error);
    }
});