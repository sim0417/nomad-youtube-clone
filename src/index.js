import express from 'express';
import morgan from 'morgan';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();
const logger = morgan('dev');

const handleServerStart = () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
};

app.use(logger);
app.listen(SERVER_PORT, handleServerStart);
