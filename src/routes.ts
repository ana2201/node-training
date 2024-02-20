import { Router } from 'express';

import { getMainMessage, getMessage } from './controllers/message-controller';
// import { getUser } from './controllers/users-controller';

import { loggerMiddleware } from './middleware/message-middleware';

const router = Router();

router.get('/', getMainMessage);

// router.get('/users/:userID', getUser);

router.get('/message', loggerMiddleware, getMessage);

export default router;
