import express from 'express';

import router from './routes';
import { loggerMiddleware } from './middleware/message-middleware';

const app = express();
const port = 3000;

app.use(loggerMiddleware);

app.use('', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
