import express from 'express';
import {Router} from 'express';
import {Request, Response} from 'express';
import {
  createComment,
  deleteComment,
  showComment,
  updatecomment,
} from '../services/comments';

export const comments = Router();

comments.route('/:postid').post(async (req: Request, res: Response) => {
  try {
    const query = await createComment(
      req.body.content,
      req.body.post_id,
      req.body.id_number,
    );
    res.status(201).json({data: {query}})
  } catch (e) {
    res.status(400).end();
  }
});

comments
  .route('/:commentid')
  .put(async (req: Request, res: Response) => {
    try {
      const query = await updatecomment(req.body.id, req.body.content);
      res.status(201).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  })
  .delete(async (req, res) => {
    try {
      const query = await deleteComment(req.body.id);
      res.status(201).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  });

comments.route('/:commentid/report').post().delete();

comments.route('/:postid/like').patch().delete();
