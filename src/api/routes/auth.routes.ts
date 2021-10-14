import { Request, Response, Router } from 'express';
import passport from 'passport';
import expressAsyncHandler from 'express-async-handler';
import { AuthControl } from '../controllers/auth.controllers';

export const login = Router();
export const emailconfirm = Router();

// login
login
  .route('/')
  .post(
    passport.authenticate('local'),
    expressAsyncHandler(AuthControl.userLogin),
  );

// email confirm
emailconfirm.route('/').patch(expressAsyncHandler(AuthControl.emailConfirm));
