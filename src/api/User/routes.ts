import { Router } from "express";
import { findAll, addList, findOne, updateOne, deleteOne } from './controller';
import { login, register } from "./utils/auth";

const router = Router();

router.get('/all', findAll);
router.get('/:id', findOne);

router.post('/', addList)

router.put('/:id', updateOne)

router.delete('/:id', deleteOne)

router.post('/login', login)
router.post('/register', register)

export default router;

// 6068953629f105a394ff2a9a