import { NextFunction, Request, Response, Router } from 'express';

import {
  createPost,
  deletePost,
  getOnePost,
  getPostsOfUser,
  updatePost,
} from '../../services/posts.services';
import { validateAuthor } from '../middlewares/validator.middle';

import { GetUserSession } from '../utils/definitions';
import { Error403, Error404 } from '../utils/httperrors';
import { dataWrap } from '../utils/wrappers';

import * as auth from '../middlewares/auth.middle';

export const me = Router();

me.route('/')

  // Create a Post
  .post(
    auth.verifyUser,
    async (req: GetUserSession, res: Response, next: NextFunction) => {
      try {
        if (req.user?.id) {
          const query = await createPost(req.user.id, req.body);
          return res.status(201).json(dataWrap(req.body));
        }
      } catch (e) {
        return res.status(400).json(JSON.stringify(e));
      }
    },
  );

// accounts/me/posts

me.route('/posts')

  // Returns a list of posts of user logged
  .get(auth.verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      if (req.user?.id) {
        const query = await getPostsOfUser(req.user.id);
        res.status(200).json({ data: { query } });
      } else {
        return res.status(403).json(Error403);
      }
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  });

// accounts/me/posts/:postid

me.route('/posts/:postid')

  // Returns a specific post of user logged
  .get(auth.verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      if (req.user?.id) {
        const query = await getOnePost(req.user.id);
        if (query) {
          return res.status(200).json(dataWrap(query));
        } else {
          return res.status(404).json(Error404);
        }
      }
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  })

  // Update an existing post
  .put(
    auth.verifyUser,
    validateAuthor,
    async (req: GetUserSession, res: Response) => {
      try {
        const postId = Number(req.params.postid);
        const query = await updatePost(postId, req.body);
        const newRecord = await getOnePost(Number(req.params.postid));
        if (newRecord) {
          return res.status(200).json(dataWrap(newRecord));
        }
      } catch (e) {
        return res.status(400).json(JSON.stringify(e));
      }
    },
  )

  // Delete an existing post
  .delete(
    auth.verifyUser,
    validateAuthor,
    async (req: GetUserSession, res: Response, next: NextFunction) => {
      try {
        const postId = Number(req.params.postid);
        const record = await getOnePost(postId);
        const query = await deletePost(postId);
        if (record) {
          return res.status(200).json(dataWrap(record));
        }
      } catch (e) {
        return res.status(400).json(JSON.stringify(e));
      }
    },
  );
