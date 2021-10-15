import { NextFunction, Request, Response, Router } from 'express';
import { LikeControl } from '../controllers/like.controllers';
import { verifyUser } from '../middlewares/auth.middle';

export const commentLike = Router();
export const commentDislike = Router();
export const postLike = Router();
export const postDislike = Router();

/* Comments */

commentLike
  .route('/posts/:postid/comments/:commentid/like')

  // Give like to a comment - ENDPOINT TESTED
  .patch(verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    await LikeControl.setLike(req, res, next, 'COMMENT')
  })

  // Remove like to a comment - ENDPOINT TESTED
  .delete(verifyUser, async (req: Request, res: Response, next: NextFunction) => {
     await LikeControl.deleteLikeOrDislike(req, res, next, 'COMMENT')});

commentDislike
  .route('/posts/:postid/comments/:commentid/dislike')

  // Give like to a comment - ENDPOINT TESTED
  .patch(verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    await LikeControl.setDislike(req, res, next, 'COMMENT')
  })

  // Remove like to a comment - ENDPOINT TESTED
  .delete(verifyUser, async (req: Request, res: Response, next: NextFunction) => {
     await LikeControl.deleteLikeOrDislike(req, res, next, 'COMMENT')});

/* Post */

postLike
  .route('/posts/:postid/like')

  // Give like to a POST - ENDPOINT TESTED
  .patch(
    verifyUser,
    async (req: Request, res: Response, next: NextFunction) => {
      await LikeControl.setLike(req, res, next, 'POST');
    },
  )

  // Remove like to a POST - ENDPOINT TESTED
  .delete(
    verifyUser,
    async (req: Request, res: Response, next: NextFunction) => {
      await LikeControl.deleteLikeOrDislike(req, res, next, 'POST');
    },
  );

postDislike
  .route('/posts/:postid/dislike')

  // Give like to a POST - ENDPOINT TESTED
  .patch(
    verifyUser,
    async (req: Request, res: Response, next: NextFunction) => {
      await LikeControl.setDislike(req, res, next, 'POST');
    },
  )

  // Remove like to a POST - ENDPOINT TESTED
  .delete(
    verifyUser,
    async (req: Request, res: Response, next: NextFunction) => {
      await LikeControl.deleteLikeOrDislike(req, res, next, 'POST');
    },
  );