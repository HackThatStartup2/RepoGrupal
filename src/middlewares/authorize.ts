import to from "await-to-js";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from "../api/User/model";
import { IPayload } from "../interfaces/payload";
import { compareHash } from "../services/bcrypt";

export const dbAccess = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    const tokenWithoutBearer = authorization.split(" ")[1];

    const payload = <IPayload>jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    const [err, userAdmin] = await to(User.findById(payload.id).exec());
    if (err)
        return res.status(401).send('Unauthorized');

    if (userAdmin.username === process.env.DB_ACCESS_USER && await compareHash(process.env.DB_ACCESS_PWD, userAdmin.password))
        return next();

    return res.status(401).send('Unauthorized');
}