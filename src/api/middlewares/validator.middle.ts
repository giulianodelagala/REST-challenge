import { PrismaClient } from '@prisma/client';
import { getOnePost } from '../../services/posts.services';

import * as asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { GetUserSession } from '../utils/definitions';
import { Error403 } from '../utils/httperrors';

const prisma = new PrismaClient();

export async function validateAuthor(
  req: GetUserSession,
  res: Response,
  next: NextFunction,
) {
  try {
    const postId = Number(req.params.postid);
    const record = await getOnePost(postId);

    if (record?.userId !== req.user?.id) {
      return res.status(403).json(Error403);
    }
    next();

  } catch (error) {
    next(error);
  }
}
