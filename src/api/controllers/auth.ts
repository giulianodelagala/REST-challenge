import { Request, Router } from 'express';
import passport from 'passport';

// import { getToken } from '../middlewares/authenticate'

const authenticate = require('../middlewares/authenticate');

export const login = Router();

// login
login.route('/').post(passport.authenticate('local'), async (req: any, res) => {
  // console.log(req.user._id);
  const token = authenticate.getToken({ _id: req.user.id})
  try {

    res.status(200).json({ token: token });
  } catch (e) {
    res.status(400).end();
  }
});
