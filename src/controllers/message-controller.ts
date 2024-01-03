import  { Request, Response } from "express";

const getMessage = (req: Request, res: Response) => {
  res.send(`Hello ${req.query.message}`)
}

export { getMessage }
