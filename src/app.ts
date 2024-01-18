import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import router from './routes';


const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());

app.use('', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
