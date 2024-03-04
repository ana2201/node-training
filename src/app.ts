import express, { Response,  Request, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

import cors from 'cors';
import helmet from 'helmet';

import { RegisterRoutes } from '../build/routes';


const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: Response) {
  res.status(404).send({  message: 'Not found' });
});

app.use(function errorHandler(
  err: unknown,
  req:  Request,
  res:  Response,
  next: NextFunction
):  Response | void {
  if (err instanceof ValidateError) {
    
    console.log(`Validation error for ${req.path}:`, err.fields);

    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});

export {app};