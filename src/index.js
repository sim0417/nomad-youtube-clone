import './db';
import './models/videos';
import './models/users';
import path from 'path';
import express from 'express';
import session from 'express-session';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import appRouters from './routers';
import { setLocalData } from './middlewares';
import MongoStore from 'connect-mongo';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();
const logger = morgan('dev');

app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(setLocalData);

app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));

const routers = appRouters();
routers.forEach(({ path, router }) => app.use(path, router));

const handleServerStart = () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
};

app.listen(SERVER_PORT, handleServerStart);
