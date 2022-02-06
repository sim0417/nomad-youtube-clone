import express from 'express';
import morgan from 'morgan';
import appRouters from './routers';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();
const logger = morgan('dev');
app.use(logger);

const routers = appRouters();
routers.forEach(({ path, router }) => app.use(path, router));

const handleServerStart = () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
};

app.listen(SERVER_PORT, handleServerStart);
