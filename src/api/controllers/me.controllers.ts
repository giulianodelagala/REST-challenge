import { NextFunction, Request, Response } from 'express';
import {
  deleteAccount,
  getUserAccount,
  updateAccount,
} from '../../services/accounts.services';

import { GetUserSession } from '../utils/definitions';
import { Error404 } from '../utils/httperrors';
import { dataWrap } from '../utils/wrappers';

export class MeControl {
  static async getUserAccount(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = await getUserAccount(Number(req.user?.id));

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async updateAccount(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = await updateAccount(Number(req.user?.id), req.body);
      next()
      //this.getUserAccount(req, res, next);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async deleteAccount(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const record = await getUserAccount(Number(req.user?.id));
      const query = await deleteAccount(Number(req.params.accountid));

      if (record) {
        return res.status(204).json(dataWrap(record));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }




}
