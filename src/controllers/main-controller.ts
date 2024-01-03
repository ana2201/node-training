import  { Request, Response } from "express";

const getMain = (req: Request, res: Response) => {
  res.send('Hello World!')
}

export { getMain }
