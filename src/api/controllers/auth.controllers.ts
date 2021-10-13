import { Request, Response, Router } from 'express';
import passport from 'passport';
import { GetUserSession } from '../utils/definitions';
import { verifyAccount } from '../../services/accounts.services';

const authenticate = require('../middlewares/passport.middle');

export const login = Router();
export const emailconfirm = Router();

// login
login.route('/').post(passport.authenticate('local'), (req: GetUserSession, res: Response) => {
  // console.log(req.user._id);

  // try {

    const token = authenticate.getToken({ _id: req.user?.id})

    return res.json({ token: token }).end();
  // } catch (e) {
  //   res.status(400).end();
  // }

});

// email confirm
emailconfirm.route('/').patch(async (req: Request, res: Response) => {
  try {
    const validateAccount = verifyAccount(req.body);
    res.status(201).json({ validateAccount });
  } catch (error) {
    console.error(error)
  }
});
