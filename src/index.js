import './db';
import './models/videos';
import './models/users';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import appRouters from './routers';
import { setLocalData } from './middlewares';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();
const logger = morgan('dev');
app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'pug');
app.use(logger);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(setLocalData);

const routers = appRouters();
routers.forEach(({ path, router }) => app.use(path, router));

const handleServerStart = () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
};

app.listen(SERVER_PORT, handleServerStart);
