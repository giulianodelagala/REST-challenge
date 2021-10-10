import { Request, Response, Router } from 'express';
import passport from 'passport';
import { GetUserSession } from '../utils/definitions';

const authenticate = require('../middlewares/authenticate');

export const login = Router();

// login
login.route('/').post(passport.authenticate('local'), (req: GetUserSession, res: Response) => {
  // console.log(req.user._id);
  if (req.user)
    res.json({error: 'already logged'} ).end();
  try {

    const token = authenticate.getToken({ _id: req.user?.id})

    res.json({ token: token }).end();
  } catch (e) {
    res.status(400).end();
  }
});
