import { NextFunction, Request, Response } from 'express';
import {
  createComment,
  deleteComment,
  getCommentsOfPost,
  getOneCommentOfPost,
  updateComment,
} from '../../services/comments.services';
import { GetUserSession } from '../utils/definitions';
import { Error404 } from '../utils/httperrors';
import { dataWrap } from '../utils/wrappers';

export class CommentControl {
  static async getCommentsOfPost(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = await getCommentsOfPost(Number(req.params.postid));

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async createComment(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = await createComment(
        Number(req.user?.id),
        Number(req.params.postid),
        req.body,
      );

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async updateComment(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const commentId = Number(req.params.commentid);
      const postId = Number(req.params.postid);
      const query = await updateComment(commentId, req.body);
      const newRecord = await getOneCommentOfPost(postId, commentId);

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async deleteComment(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const commentId = Number(req.params.commentid);
      const postId = Number(req.params.postid);

      const record = await getOneCommentOfPost(postId, commentId);

      if (record) {
        res.status(200).json(dataWrap(record));
      } else {
        return res.status(404).json(Error404);
      }

      const query = await deleteComment(commentId);
      next();
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async getOneCommentOfPost(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const commentId = Number(req.params.commentid);
      const postId = Number(req.params.postid);
      const query = await getOneCommentOfPost(postId, commentId);

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}
