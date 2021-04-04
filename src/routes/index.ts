import { Request, Response, Router } from "express";
import { neaRoutes } from "../api/Nea";
import { userRoutes } from "../api/User";
import { dbAccess } from "../middlewares/authorize";
import { feedDb } from "../scripts/csvJson";
import { phaRoutes } from "../api/Pha";
import passport from 'passport';
import { clientRoutes } from "../api/Client";

const router = Router();

router.get('/feed', passport.authenticate('jwt', { session: false }), dbAccess, async (req, res) => {
    const resl = await feedDb()
    res.send(resl)
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    res.send('This is a protected route for test');
})

//Auth routes
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/api/failure' }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/failure');
});

router.get('/api/filure', (req, res) => {
    res.send('FAIL AUTHETICATION');
});



router.use('/nea', neaRoutes);
router.use('/user', userRoutes);
router.use('/pha', phaRoutes)
router.use('/client', clientRoutes)

export default router;