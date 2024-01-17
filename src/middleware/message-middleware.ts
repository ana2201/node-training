import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request made to ${req.path}`);
  
  next();
};

export { loggerMiddleware };
