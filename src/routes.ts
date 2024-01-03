import { Router } from 'express';

import { getMainMessage, getMessage } from './controllers/message-controller';
import { getTest} from './controllers/tests-controller';

const router = Router();

router.get('/', getMainMessage);

router.get('/message', getMessage);

router.get('/tests/:testID', getTest);


export default router;
