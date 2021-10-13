import { Request, Response, Router } from 'express';
import { setDislike, setLike } from '../../services/like.services';

export const commentLike = Router();

commentLike
  .route('posts/:postid/comments/:commentid/like')

  // toggle between like to a comment - ENDPOINT TESTED
  .patch(async (req: Request, res: Response) => {
    try {
      const query = await setLike(1, Number(req.params.commentid), 'COMMENT');
      res.status(201).json({ data: { query } });
    } catch (error) {
      res.status(400).end();
    }
  });

commentLike
  .route('posts/:postid/comments/:commentid/dislike')

  // toggle between like or dislike to a comment - ENDPOINT TESTED
  .patch(async (req: Request, res: Response) => {
    try {
      const query = await setDislike(
        1,
        Number(req.params.commentid),
        'COMMENT',
      );
      res.status(201).json({ data: { query } });
    } catch (error) {
      res.status(400).end();
    }
  })

  // remove like to a comment
  .delete();