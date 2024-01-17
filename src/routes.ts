import { Router } from 'express';

import { getMainMessage, getMessage } from './controllers/message-controller';
import { getTestID } from './controllers/tests-controller';

import { loggerMiddleware } from './middleware/message-middleware';

const router = Router();

router.get('/', loggerMiddleware, getMainMessage);

router.get('/message', getMessage);

router.get('/tests/:testID', getTestID);

export default router;
