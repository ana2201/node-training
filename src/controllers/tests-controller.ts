import { Request, Response } from "express";

const getTest = (req: Request, res: Response) => {
  const id = Number(req.params.testID)

  res.send(`ID ---> ${id}`)
}

export { getTest }
