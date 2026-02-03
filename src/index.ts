import express from 'express';
import { PORT } from './config';
import { cardsRouter } from './routers/cards.router';

const server = express();

server.get('/', (req, res) => {
  res.send('You are ok.');
});

server.use('/cards', cardsRouter);

server.listen(PORT);
