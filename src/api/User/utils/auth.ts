import { Request, Response } from "express";
import to from 'await-to-js';
import User, { IUser } from './../model';
import { createToken } from "./jwt";
import { compareHash } from "../../../services/bcrypt";

export const login = async (req: Request, res: Response) => {
    const { username, password }: IUser = req.body;

    const [errUser, user] = await to(User.findOne({ username: username }).exec());
    if (errUser || !user)
        return res.status(400).json({ err: errUser || user });

    const isUserValid = await compareHash(password, user.password);
    if (!isUserValid)
        return res.status(500).json({ err: 'Incorrect data' });

    const token = createToken(user.id);

    return res.status(200).json(token)
}

export const register = async (req: Request, res: Response) => {
    const { username, password }: IUser = req.body;

    const [errUser, user] = await to(User.findOne({ username: username }).exec());
    if (errUser)
        return res.status(500).json({ err: errUser });

    const [err, instance] = await to(new User(req.body).save());
    if (err)
        return res.status(500).json({ err: err });

    return res.status(201).json({ data: instance })
}