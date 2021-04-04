import { Router } from "express";
import { findAll, addList, findOne, updateOne, deleteOne } from './controller';

const router = Router();

router.get('/all', findAll);
router.get('/:id', findOne);

router.post('/', addList)

router.put('/:id', updateOne)

router.delete('/:id', deleteOne)

export default router;