import { NextFunction, Request, Response, Router } from 'express';
import createHttpError from 'http-errors';

import {
  deletePost,
  getOnePost,
  getPosts,
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

export const posts = Router();

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

// Create a Post
// .post(auth.verifyUser, async (req: GetUserSession, res: Response) => {
//   try {
//     if (req.user?.id) {
//       const query = await createPost(req.user.id, req.body);
//       res.status(201).json(dataWrap(req.body));
//     }
//   } catch (e) {
//     res.status(400).end();
//   }
// });

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

posts
  .route('/:postid/report')

  // report a post
  .post(async (req, res) => {
    try {
      const createReport = await createReportPost(
        Number(req.params.postid),
        req.body,
      );
      res.status(200).json({ data: { createReport } });
    } catch (error) {
      res.status(400).end();
    }
  })

  // remove report status to a post
  .delete(async (req, res) => {
    try {
      const removeReport = await deleteReport(Number(req.params.postid));
    } catch (error) {
      res.status(400).end();
    }
  });
