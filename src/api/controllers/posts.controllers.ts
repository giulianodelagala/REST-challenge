import { NextFunction, Request, Response } from 'express';
import {
  createPost,
  deletePost,
  getOnePost,
  getPosts,
  getPostsOfUser,
  updatePost,
} from '../../services/posts.services';
import { GetUserSession } from '../utils/definitions';
import { Error404 } from '../utils/httperrors';
import { dataWrap } from '../utils/wrappers';

export class PostControl {
  static async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await getPosts();

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async getOnePost(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await getOnePost(Number(req.params.postid));

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async getPostsOfUser(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = await getPostsOfUser(Number(req.user?.id));

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async getPostsOfAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = await getPostsOfUser(Number(req.params.accountid));

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error404);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async createPost(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (req.user?.id) {
        const query = await createPost(req.user.id, req.body);
        if (query) {
          return res.status(201).json(dataWrap(query));
        }
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async updatePost(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postId = Number(req.params.postid);
      const query = await updatePost(postId, req.body);
      next();
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async deletePost(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postId = Number(req.params.postid)
      const record = await getOnePost(postId);

      if (record) {
        res.status(200).json(dataWrap(record));
      } else {
        return res.status(404).json(Error404);
      }

      const query = await deletePost(postId);
      next();

    } catch (e) {
      return res.status(400).json(e);
    }
  }
}
