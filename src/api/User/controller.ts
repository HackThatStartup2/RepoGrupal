import { Request, Response } from "express";
import to from 'await-to-js';
import User, { IUser } from './model';
import { checkArray } from "../../helpers";
import { addMany, addOne } from "../../helpers/addHandlers";
import { encrypt } from "../../services/bcrypt";

export const findAll = async (req: Request, res: Response) => {
    const [err, users] = await to(User.find({}).exec())
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ data: users })
}

export const findOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, user] = await to(User.findById(id).exec())
    if (err)
        return res.status(404).json({ err: err })

    return res.status(200).json({ data: user })
}

export const addList = async (req: Request, res: Response) => {
    const body: IUser | IUser[] = req.body;

    const [err, isAdded] = await to(checkArray(body) ? addMany(User, body) : addOne(User, body));
    if (err || !isAdded)
        return res.status(400).json({ err: err || isAdded })

    return res.status(201).json({ msg: isAdded })
}

export const updateOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const body: IUser = req.body;
    body.password = await encrypt(body.password);

    const [err, newUser] = await to(User.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false }).exec());
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: newUser })
}

export const deleteOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, deleted] = await to(User.findByIdAndDelete(id, { useFindAndModify: false }).exec())
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: 'DELETED' })
}