import to from "await-to-js";
import { Request, Response, NextFunction } from "express";

export const userBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("middleware");
  if (!req.body)
    return res.status(400).send({ error: "some param is missing" });
  return next();
};
