import { Request, Response, Router } from 'express';
import {
  deleteLikeOrDisLike,
  setDislike,
  setLike,
} from '../../services/like.services';
import { verifyUser } from '../middlewares/auth.middle';
import { GetUserSession } from '../utils/definitions';
import { dataWrap } from '../utils/wrappers';

export const commentLike = Router();
export const commentDislike = Router();
export const postLike = Router();
export const postDislike = Router();

postLike

  // give like to a POST
  .route('/posts/:postid/like')
  .patch(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await setLike(
        Number(req.user?.id),
        Number(req.params.postid),
        'POST',
      );

      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  })

  // Remove like to a post
  .delete(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await deleteLikeOrDisLike(
        Number(req.user?.id),
        Number(req.params.postid),
        'POST',
      );
      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  });

postDislike

  // give Dislike to a POST
  .route('/posts/:postid/dislike')
  .patch(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await setLike(
        Number(req.user?.id),
        Number(req.params.postid),
        'POST',
      );

      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  })

  // Remove like to a POST
  .delete(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await deleteLikeOrDisLike(
        Number(req.user?.id),
        Number(req.params.postid),
        'POST',
      );
      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  });

commentLike
  .route('/posts/:postid/comments/:commentid/like')

  // Give like to a comment - ENDPOINT TESTED
  .patch(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await setLike(
        Number(req.user?.id),
        Number(req.params.commentid),
        'COMMENT',
      );

      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  })

  // Remove like to a comment - ENDPOINT TESTED
  .delete(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await deleteLikeOrDisLike(
        Number(req.user?.id),
        Number(req.params.commentid),
        'COMMENT',
      );
      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  });

commentDislike
  .route('/posts/:postid/comments/:commentid/dislike')

  // Give dislike to a comment ENDPOINT TESTED
  .patch(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      console.log(req.params.postid, req.params.commentid, req.user?.id);
      const query = await setDislike(
        Number(req.user?.id),
        Number(req.params.commentid),
        'COMMENT',
      );

      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  })

  // remove dislike to a comment - ENDPOINT TESTED
  .delete(verifyUser, async (req: GetUserSession, res: Response) => {
    try {
      const query = await deleteLikeOrDisLike(
        Number(req.user?.id),
        Number(req.params.commentid),
        'COMMENT',
      );
      res.status(201).json(dataWrap(query));
    } catch (error) {
      res.status(400).end();
    }
  });
