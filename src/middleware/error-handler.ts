import { Response,  Request, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

export function notFoundHandler(_req: Request,res: Response) {
  res.status(404).send({  message: 'Page not found' });
}

export function errorHandler(
  err: unknown,
  req:  Request,
  res:  Response,
  next: NextFunction
):  Response | void {
  if (err instanceof ValidateError) {
    console.log(`Validation error for ${req.path}:`, err.fields.message.message);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err.fields.message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  
  next();
}