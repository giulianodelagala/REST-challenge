import { NextFunction, Request, Response, Router } from 'express';
import createHttpError from 'http-errors';

import {
  deletePost,
  getOnePost,
  getPosts,
  getPostsOfUser,
} from '../../services/posts.services';
import {
  createReportPost,
  deleteReport,
} from '../../services/reports.services';

import { GetUserSession } from '../utils/definitions';
import { dataWrap } from '../utils/wrappers';

import * as auth from '../middlewares/auth.middle';
import { Error404 } from '../utils/httperrors';
import { verifyAdmin } from '../middlewares/passport.middle';
import { accounts } from './accounts.controllers';

export const posts = Router();
export const accountsPosts = Router();

// /posts

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
  });

posts
  .route('/:postid')

  // Returns a single post
  .get(async (req: Request, res: Response) => {
    try {
      const query = await getOnePost(Number(req.params.postid));

      if (query) {
        res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      res.status(400).end();
    }
  })

  // Delete an existing post
  // TODO verifyAdmin
  .delete(
    auth.verifyUser,
    async (req: GetUserSession, res: Response, next: NextFunction) => {
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
    },
  );


// accounts/:accountid/posts

accountsPosts
  .route('/:accountid/posts')

  // Returns all published posts of a specific user
  .get(async (req: Request, res: Response) => {
    try {
        const query = await getPostsOfUser(Number(req.params.accountid));
        res.status(200).json(dataWrap(query));
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  })

accountsPosts
  .route('/:accountid/posts/:postid')

  // Returns a specific post of a specific user
  .get(async (req: Request, res: Response) => {
    try {
        const query = await getOnePost(Number(req.params.postid));

        if (query) {
          return res.status(200).json(dataWrap(query));
        } else {
          return res.status(404).json(Error404);
        }
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  });