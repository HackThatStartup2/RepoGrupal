import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();
import './services/db/mongo';
import routes from './routes';
import helmet from 'helmet';
import passport from 'passport'
import jwtStrategy, { githubStrategy } from './services/passport'

const app = express();
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.use(cors())
app.use(express.json());

// Secured HTTP headers
app.use(helmet());

app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(githubStrategy);

app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)



export default app;
