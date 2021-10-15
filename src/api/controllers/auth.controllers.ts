import { NextFunction, Request, Response } from 'express';
import { getOneAccount, verifyAccount } from '../../services/accounts.services';

import { GetUserSession } from '../utils/definitions';
import { Error401Email } from '../utils/httperrors';

const authenticate = require('../middlewares/passport.middle');

export class AuthControl {
  static async userLogin(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = await getOneAccount(Number(req.user?.id));
      if (!query?.emailVerifiedAt) {
        return res.status(401).json(Error401Email);
      }

      const token = authenticate.getToken({ _id: req.user?.id });
      return res.json({ token: token }).end();
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  }

  static async emailConfirm(req: Request, res: Response, next: NextFunction) {
    try {
      const validateAccount = verifyAccount(req.body);

      res.status(201).json({ validateAccount });
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  }
}
