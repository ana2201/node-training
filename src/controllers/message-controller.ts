import  { Request, Response } from 'express';

const getMainMessage = (req: Request, res: Response) => {
  res.send('Hello World!');
};

const getMessage = (req: Request, res: Response) => {
  res.send(`Hello ${req.query.message}`);
};

export { getMessage, getMainMessage };
