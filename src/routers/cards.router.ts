import express, { Response, Request } from 'express';

export const cardsRouter = express.Router();

cardsRouter.get('/:id', (req: Request<IdParams, {}>, res: Response<Card>) => {
  // TODO Return cards
});

cardsRouter.get(
  '/',
  (req: Request<{}, {}>, res: Response<GetCardsResponse>) => {
    // TODO Return cards
  },
);

cardsRouter.post(
  '/',
  (req: Request<{}, CreateCardRequest>, res: Response<Card>) => {
    // TODO Create card
  },
);

cardsRouter.put('/:id', (req: Request<IdParams, Card>, res: Response<Card>) => {
  // TODO Update card
});

cardsRouter.delete('/:id', (req: Request<IdParams>, res: Response<void>) => {
  // TODO Delete card
});
