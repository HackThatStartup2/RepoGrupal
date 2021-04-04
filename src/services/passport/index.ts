import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from '../../api/User/model';

import { Strategy as GithubStrategy } from 'passport-github2'

export const githubStrategy = new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
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