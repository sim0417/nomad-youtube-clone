import './db';
import express from 'express';
import morgan from 'morgan';
import appRouters from './routers';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();
const logger = morgan('dev');
app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'pug');
app.use(logger);
app.use(express.urlencoded({ extended: true }));

const routers = appRouters();
routers.forEach(({ path, router }) => app.use(path, router));

const handleServerStart = () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
};

app.listen(SERVER_PORT, handleServerStart);
