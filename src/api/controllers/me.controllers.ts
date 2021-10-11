import { NextFunction, Request, Response, Router } from 'express';
import createHttpError from 'http-errors';
import passport from 'passport';

import {
  createPost,
  deletePost,
  getOnePost,
  getPosts,
} from '../../services/posts.services';

import { GetUserSession } from '../utils/definitions';
import { dataWrap } from '../utils/wrappers';

const pass = require('../middlewares/passport.middlewares');
const auth = require('../middlewares/auth.middlewares');

export const me = Router();

me
  .route('/')

  // Create a Post
  .post(auth.verifyUser, async (req: GetUserSession, res: Response, next: NextFunction) => {
    try {
      if (req.user?.id) {
        const query = await createPost(req.user.id, req.body);
        res.status(201).json(dataWrap(req.body));
      }
    } catch (e) {
      // res.status(400).end();
      res.send(e).end();
    }
  });
