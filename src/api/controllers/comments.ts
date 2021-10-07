import express from 'express';
import {Router} from 'express';
import {
  showComment,
  createComment,
  updatecomment,
  deleteComment,
} from '../../services/comments';
import {createReport} from '../../services/reports';
import {Request, Response} from 'express';

export const comments = Router();

comments
  .route('/:postid')

  // create a comment or draft
  .post(async (req: Request, res: Response) => {
    try {
      const query = await createComment(
        req.body.content,
        req.body.post_id,
        req.body.id_number,
        req.body.is_publisheds,
      );
      res.status(201).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  });

comments
  .route('/:commentid')

  // Update an existing comment
  .put(async (req: Request, res: Response) => {
    try {
      const query = await updatecomment(req.body.id, req.body.content);
      res.status(201).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  })

  // Delete an existing comment
  .delete(async (req: Request, res: Response) => {
    try {
      const query = await deleteComment(req.body.id);
      res.status(201).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  });

comments
  .route('/:commentid/report')

  // Report a comment
  .post(async (req: Request, res: Response) => {
    try {
      const query = await createReport(
        req.body.content,
        req.body.is_published,
        req.body.user_id,
        req.body.post_comment_id,
        req.body.publishing_type,
      );
      res.status(201).json({data: {query}});
    } catch (error) {
      res.status(400).end();
    }
  })

  // Delete a comment
  .delete();
