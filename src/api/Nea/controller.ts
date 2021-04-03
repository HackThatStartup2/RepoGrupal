import { Request, Response } from "express";
import to from 'await-to-js';
import Nea, { INea } from './model';
import { checkArray } from "../../helpers";
import { addMany, addOne } from "../../helpers/addHandlers";

export const findAll = async (req: Request, res: Response) => {
    const [err, neas] = await to(Nea.find({}).exec());
    if (err)
        return res.status(500).json({ err: err })

    return res.status(200).json({ data: neas })
}

export const findOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, nea] = await to(Nea.findById(id).exec());
    if (err)
        return res.status(404).json({ err: err })

    return res.status(200).json({ data: nea })
}

export const addList = async (req: Request, res: Response) => {
    const body: INea | INea[] = req.body;

    const [err, isAdded] = await to(checkArray(body) ? addMany(Nea, body) : addOne(Nea, body));
    if (err || !isAdded)
        res.status(500).json({ err: err || isAdded })

    res.status(201).json({ data: isAdded })
}

export const updateOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const body: INea = req.body;

    const [err, newNea] = await to(Nea.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false }).exec());
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: newNea })
}

export const deleteOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, deleted] = await to(Nea.findByIdAndDelete(id, { useFindAndModify: false }).exec())
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: 'DELETED' })
}