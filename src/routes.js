import { Router } from 'express'

import { getMain, getMessage, getTest } from './controllers/index.js'

const router = Router()

router.get('/', getMain)

router.get('/tests/:testID', getTest)

router.get('/message', getMessage)


export default router;
