import express, { Response, Request, response } from 'express';
import { Board, CreateBoardRequest, GetBoardsResponse } from '../types/boards';
import { IdParams } from '../types/common';
import {
  createBoard,
  deleteBoard,
  getManyBoards,
  getOneBoard,
  updateBoard,
} from '../database/boards-repository';
import { randomUUID } from 'crypto';
import { validateBoardInput } from './validation';

export const boardsRouter = express.Router();

boardsRouter.get(
  '/:id',
  async (req: Request<IdParams, {}>, res: Response<Board>) => {
    const board = await getOneBoard(req.params.id);
    if (!board) {
      return res.sendStatus(404);
    }
    res.send(board);
  },
);

boardsRouter.get(
  '/',
  async (req: Request<{}, {}>, res: Response<GetBoardsResponse>) => {
    const boards = await getManyBoards();
    res.send(boards);
  },
);

boardsRouter.post(
  '/',
  validateBoardInput,
  async (req: Request<{}, Board, CreateBoardRequest>, res: Response<Board>) => {
    const board: Board = {
      name: req.body.name,
      id: randomUUID(),
    };

    await createBoard(board);
    res.send(board);
  },
);

boardsRouter.put(
  '/:id',
  validateBoardInput,
  async (
    req: Request<IdParams, Board, CreateBoardRequest>,
    res: Response<Board>,
  ) => {
    const board = {
      id: req.params.id,
      name: req.body.name,
    };
    await updateBoard(board);
    res.send(board);
  },
);

boardsRouter.delete(
  '/:id',
  async (req: Request<IdParams>, res: Response<void>) => {
    await deleteBoard(req.params.id);
    res.sendStatus(204);
  },
);
