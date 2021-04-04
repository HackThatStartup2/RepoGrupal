import { Request, Response } from "express";
import to from 'await-to-js';
import Client, { IClient } from './model';
import { checkArray } from "../../helpers";
import { addManyClient, addOneClient } from "./utils/addClient";

export const findAll = async (req: Request, res: Response) => {
    const [err, client] = await to(Client.find({}).exec());
    if (err)
        return res.status(500).json({ err: err })

    return res.status(200).json({ data: client })
}

export const findOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, nea] = await to(Client.findById(id).exec());
    if (err)
        return res.status(404).json({ err: err })

    return res.status(200).json({ data: nea })
}

export const addList = async (req: Request, res: Response) => {
    const body: IClient | IClient[] = req.body;

    const [err, isAdded] = await to(checkArray(body) ? addManyClient(Client, body) : addOneClient(Client, body));
    if (err || !isAdded)
        res.status(500).json({ err: err || isAdded })

    res.status(201).json({ data: isAdded })
}

export const updateOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const body: IClient = req.body;

    const [err, newClient] = await to(Client.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false }).exec());
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: newClient })
}

export const deleteOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, deleted] = await to(Client.findByIdAndDelete(id, { useFindAndModify: false }).exec())
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: 'DELETED' })
}