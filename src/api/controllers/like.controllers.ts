import { PublishingType } from '.prisma/client';
import { NextFunction, Request, Response } from 'express';
import {
  deleteLikeOrDisLike,
  setDislike,
  setLike,
} from '../../services/like.services';
import { GetUserSession } from '../utils/definitions';
import { Error400, Error404 } from '../utils/httperrors';
import { dataWrap } from '../utils/wrappers';

export class LikeControl {
  static async setLike(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
    publishType: 'COMMENT' | 'POST',
  ) {
    try {
      const publishId =
        publishType === 'COMMENT'
          ? Number(req.params.commentid)
          : Number(req.params.postid);

      const query = await setLike(Number(req.user?.id), publishId, publishType);

      if (query) {
        return res.status(201).json(dataWrap(query));
      } else {
        return res.status(400).json(Error400);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async setDislike(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
    publishType: 'COMMENT' | 'POST',
  ) {
    try {
      const publishId =
        publishType === 'COMMENT'
          ? Number(req.params.commentid)
          : Number(req.params.postid);

      const query = await setDislike(
        Number(req.user?.id),
        publishId,
        publishType,
      );

      if (query) {
        return res.status(201).json(dataWrap(query));
      } else {
        return res.status(400).json(Error400);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  static async deleteLikeOrDislike(
    req: GetUserSession,
    res: Response,
    next: NextFunction,
    publishType: 'COMMENT' | 'POST',
  ) {
    try {
      const publishId =
        publishType === 'COMMENT'
          ? Number(req.params.commentid)
          : Number(req.params.postid);

      const query = await deleteLikeOrDisLike(
        Number(req.user?.id),
        publishId,
        publishType,
      );

      if (query) {
        return res.status(201).json(dataWrap(query));
      } else {
        return res.status(400).json(Error400);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}
