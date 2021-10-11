import { Request, Response, Router } from 'express';
import passport from 'passport';
import { GetUserSession } from '../utils/definitions';

const authenticate = require('../middlewares/passport.middlewares');

export const login = Router();

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
