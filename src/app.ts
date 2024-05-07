import express  from 'express';

import cors from 'cors';
import helmet from 'helmet';

import { RegisterRoutes } from '../build/routes';

import { errorHandler, notFoundHandler } from './middleware/error-handler';

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

RegisterRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

export {app};