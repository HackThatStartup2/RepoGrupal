import jwt from 'jsonwebtoken';
import { IPayload } from './../../../interfaces/payload';

export const createToken = (id: string): string => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: 86400 });
};

export const getIdFromPayload = (token: string) => {
    const tokenWithoutBearer = token.split(" ")[1];

    const payload = <IPayload>jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    return payload.id;
};