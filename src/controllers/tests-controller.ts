import { Request, Response } from 'express';

const getTestID = (req: Request, res: Response) => {
  const id = Number(req.params.testID);

  res.send(`ID ---> ${id}`);
};

export { getTestID };
