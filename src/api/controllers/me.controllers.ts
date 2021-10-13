import { NextFunction, Request, Response, Router } from 'express';

import {
  createPost,
  deletePost,
  getOnePost,
  getPostsOfUser,
  updatePost,
} from '../../services/posts.services';
import {
  validateAuthorComment,
  validateAuthorPost,
} from '../middlewares/validator.middle';

import { GetUserSession } from '../utils/definitions';
import { Error403, Error404 } from '../utils/httperrors';
import { dataWrap } from '../utils/wrappers';

import * as auth from '../middlewares/auth.middle';
import {
  createComment,
  deleteComment,
  getOneCommentOfPost,
  updateComment,
} from '../../services/comments.services';
import {
  deleteAccount,
  getOneAccount,
  getUserAccount,
  updateAccount,
} from '../../services/accounts.services';

export const me = Router();

/*
  account
*/
me.route('/')

  // Returns ME account info
  .get(auth.verifyUser, async (req: GetUserSession, res) => {
    try {
      const query = await getUserAccount(Number(req.user?.id));

      res.status(200).json({ data: { query } });
    } catch (e) {
      res.status(400).end();
    }
  })

  // Update ME account
  // TODO restrict some changes ROLE!
  .put(auth.verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await updateAccount(Number(req.user?.id), req.body);
      const record = await getUserAccount(Number(req.user?.id));

      if (record) {
        return res.status(200).json(dataWrap(record));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      res.status(400).end();
    }
  })

  // Delete ME account
  .delete(auth.verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const record = await getUserAccount(Number(req.user?.id));
      const query = await deleteAccount(Number(req.params.accountid));
    } catch (e) {
      res.status(400).end();
    }
  });

/*
  Posts
*/

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
        res.status(200).json(dataWrap(query));
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
  .get(
    auth.verifyUser,
    validateAuthorPost,
    async (req: GetUserSession, res: Response) => {
      try {
        if (req.user?.id) {
          const query = await getOnePost(Number(req.params.postid));

          if (query) {
            return res.status(200).json(dataWrap(query));
          } else {
            return res.status(404).json(Error404);
          }
        }
      } catch (e) {
        return res.status(400).json(JSON.stringify(e));
      }
    },
  )

  // Update an existing post
  .put(
    auth.verifyUser,
    validateAuthorPost,
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
    validateAuthorPost,
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

/*
  Comments
*/

me.route('/posts/:postid/comments')

  // create a comment or draft - OK
  .post(auth.verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await createComment(
        Number(req.user?.id),
        Number(req.params.postid),
        req.body,
      );

      return res.status(201).json(dataWrap(req.body));
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  });

me.route('/posts/:postid/comments/:commentid')

  // Update an existing comment - OK
  .put(
    auth.verifyUser,
    validateAuthorComment,
    async (req: GetUserSession, res: Response) => {
      try {
        const commentId = Number(req.params.commentid);
        const postId = Number(req.params.postid);
        const query = await updateComment(commentId, req.body);
        const newRecord = await getOneCommentOfPost(postId, commentId);

        if (newRecord) {
          return res.status(200).json(dataWrap(newRecord));
        }
      } catch (e) {
        return res.status(400).json(JSON.stringify(e));
      }
    },
  )

  // Delete an existing comment - OK
  .delete(
    auth.verifyUser,
    validateAuthorComment,
    async (req: Request, res: Response) => {
      try {
        const postId = Number(req.params.postid);
        const commentId = Number(req.params.commentid);

        const record = await getOneCommentOfPost(postId, commentId);
        const query = await deleteComment(commentId);

        if (record) {
          return res.status(200).json(dataWrap(record));
        }
      } catch (e) {
        return res.status(400).json(JSON.stringify(e));
      }
    },
  );
