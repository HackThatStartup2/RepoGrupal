import { Request, Response } from "express";
import to from 'await-to-js';
import Pha, { IPha } from './model';
import { checkArray } from "../../helpers";
import { addMany, addOne } from "../../helpers/addHandlers";

export const findAll = async (req: Request, res: Response) => {
    const [err, phas] = await to(Pha.find({}).exec());
    if (err)
        return res.status(500).json({ err: err })

    return res.status(200).json({ data: phas })
}

export const findOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, pha] = await to(Pha.findById(id).exec());
    if (err)
        return res.status(404).json({ err: err })

    return res.status(200).json({ data: pha })
}

export const addList = async (req: Request, res: Response) => {
    const body: IPha | IPha[] = req.body;

    const [err, isAdded] = await to(checkArray(body) ? addMany(Pha, body) : addOne(Pha, body));
    if (err || !isAdded)
        res.status(500).json({ err: err || isAdded })

    res.status(201).json({ data: isAdded })
}

export const updateOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const body: IPha = req.body;

    const [err, newPha] = await to(Pha.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false }).exec());
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: newPha })
}

export const deleteOne = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const [err, deleted] = await to(Pha.findByIdAndDelete(id, { useFindAndModify: false }).exec())
    if (err)
        return res.status(400).json({ err: err })

    return res.status(200).json({ msg: 'DELETED' })
}