import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from '../../api/User/model';

const GITHUB_CLIENT_ID = "dd04c96a6b104b9746c6"; //!
const GITHUB_CLIENT_SECRET = "40c8010a6c4e5239e988faffd9529cfeaf8b6da9"; //!

import { Strategy as GithubStrategy } from 'passport-github2'

export const githubStrategy = new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/github/callback"
}, function (accessToken, refreshToken, profile, cb) {
  console.log(profile);
  // cb(null, profile);
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