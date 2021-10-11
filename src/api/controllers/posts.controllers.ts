import { NextFunction, Request, Response, Router } from 'express';
import createHttpError from 'http-errors';

import {
  createPost,
  deletePost,
  getOnePost,
  getPosts,
} from '../../services/posts.services';

import { GetUserSession } from '../utils/definitions';
import { dataWrap } from '../utils/wrappers';

const auth = require('../middlewares/auth.middlewares');

export const posts = Router();

// define the posts route
posts
  .route('/')

  // Return a list of published Posts
  .get(async (req: Request, res: Response) => {
    try {
      const query = await getPosts();

      res.status(200).json(dataWrap(query));
    } catch (e) {
      res.status(400).end();
    }
  })

  // Create a Post
  .post(auth.verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      if (req.user?.id) {
        const query = await createPost(req.user.id, req.body);
        res.status(201).json(dataWrap(req.body));
      }
    } catch (e) {
      res.status(400).end();
    }
  });

posts
  .route('/:postid')

  // Returns a single post
  .get(async (req, res) => {
    try {
      const query = await getOnePost(Number(req.params.postid));

      res.status(200).json({ data: { query } });
    } catch (e) {
      res.status(400).end();
    }
  })

  // Delete an existing post
  .delete(auth.verifyUser, async (req: GetUserSession, res: Response, next: NextFunction) => {
    try {
      const record = await getOnePost(Number(req.params.postid));

      // Verify if User is author
      if (record?.userId !== req.user?.id) {
        return next(createHttpError(403, 'You are not authorized'));

      }

      const query = await deletePost(Number(req.params.postid));

      res.status(200).json({ data: { record } });
    } catch (e) {
      // if (res.statusCode === 403) {
      //   res.end();
      // }
      // res.status(400).end();
      res.end();
    }
  });
