import express from 'express';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

const handleServerStart = () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
};

app.listen(SERVER_PORT, handleServerStart);
