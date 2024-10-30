import { Response,  Request, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

import { ApiError } from '../utils/apiError';
import { ErrorInterface } from '../types/error';
import { errors } from '../utils/errors';

export function notFoundHandler(_req: Request,res: Response) {
  res.status(404).send({  message: 'Page not found' });
}

export function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req:  Request,
  res:  Response,
  next: NextFunction
):  Response | void {
  let response:ErrorInterface;

  if (err instanceof ApiError) {
    response = {
      httpCode: err.httpCode,
      errorCode: err.errorCode,
      description: err.message,
    };
  } else if (err instanceof ValidateError) {
    response = errors.VALIDATION_ERROR;
  } else {
    response = errors.INTERNAL_SERVER_ERROR;
  }

  res.status(response.httpCode).send(response);
  next();
}