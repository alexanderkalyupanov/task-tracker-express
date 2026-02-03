import express, { Response, Request, response } from 'express';
import { Card, CreateCardRequest, GetCardsResponse } from '../types/cards';
import { IdParams } from '../types/common';
import {
  createCard,
  deleteCard,
  getManyCards,
  getOneCard,
  updateCard,
} from '../database/cards-repository';
import { randomUUID } from 'crypto';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/:id',
  async (req: Request<IdParams, {}>, res: Response<Card>) => {
    const card = await getOneCard(req.params.id);
    if (!card) {
      return res.sendStatus(404);
    }
    res.send(card);
  },
);

cardsRouter.get(
  '/',
  async (req: Request<{}, {}>, res: Response<GetCardsResponse>) => {
    const cards = await getManyCards();
    res.send(cards);
  },
);

cardsRouter.post(
  '/',
  async (req: Request<{}, Card, CreateCardRequest>, res: Response<Card>) => {
    const card: Card = {
      text: req.body.text,
      id: randomUUID(),
    };

    await createCard(card);
    res.send(card);
  },
);

cardsRouter.put(
  '/:id',
  async (
    req: Request<IdParams, Card, CreateCardRequest>,
    res: Response<Card>,
  ) => {
    const card = {
      id: req.params.id,
      text: req.body.text,
    };
    await updateCard(card);
    res.send(card);
  },
);

cardsRouter.delete(
  '/:id',
  async (req: Request<IdParams>, res: Response<void>) => {
    await deleteCard(req.params.id);
    res.sendStatus(204);
  },
);
