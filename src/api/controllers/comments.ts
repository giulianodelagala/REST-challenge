import express from 'express';
import { Router } from 'express';
import {
  showComment,
  createComment,
  updateComment,
  deleteComment,
} from '../../services/comments';
import { createReportComment } from '../../services/reports';
import { Request, Response } from 'express';
import { setDislike, setLike } from '../../services/likeComments';

export const comments = Router();

comments
  .route('/:postid')

  // create a comment or draft - ENDPOINT TESTED
  .post(async (req: Request, res: Response) => {
    try {
      const query = await createComment(req.body, Number(req.params.postid));
      res.status(201).json({
        data: {
          id: query.id,
          content: query.content,
          is_published: query.isPublished,
        },
      });
    } catch (e) {
      res.status(400).end();
    }
  });

comments
  .route('/:commentid')

  // Update an existing comment - ENDPOINT TESTED
  .put(async (req: Request, res: Response) => {
    try {
      const query = await updateComment(Number(req.params.commentid), req.body);
      res.status(201).json({
        data: {
          content: query.content,
          is_published: query.isPublished,
          user_id: query.userId,
        },
      });
    } catch (e) {
      res.status(400).end();
    }
  })

  // Delete an existing comment - ENDPOINT TESTED
  .delete(async (req: Request, res: Response) => {
    try {
      const query = await deleteComment(Number(req.params.commentid));
      res.status(204).json({ query });
    } catch (e) {
      res.status(400).end();
    }
  });

comments
  .route('/:commentid/report')

  // Report in a comment - ENDPOINT TESTED
  .post(async (req: Request, res: Response) => {
    try {
      const query = await createReportComment(
        Number(req.params.commentid),
        req.body,
      );
      res.status(201).json({ data: { query } });
    } catch (error) {
      res.status(400).end();
    }
  });

comments
  .route('/:commentid/like')

  // toggle between like to a comment - ENDPOINT TESTED
  .patch(async (req: Request, res: Response) => {
    try {
      const query = await setLike(1, Number(req.params.commentid),'COMMENT');
      res.status(201).json({ data: { query } });
    } catch (error) {
      res.status(400).end();
    }
  })

comments
  .route('/:commentid/dislike')

  // toggle between like or dislike to a comment - ENDPOINT TESTED
  .patch(async (req: Request, res: Response) => {
    try {
      const query = await setDislike(1, Number(req.params.commentid),'COMMENT');
      res.status(201).json({ data: { query } });
    } catch (error) {
      res.status(400).end();
    }
  })

  // remove like to a comment
  .delete();