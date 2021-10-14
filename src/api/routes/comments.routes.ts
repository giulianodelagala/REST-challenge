import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { CommentControl } from '../controllers/comments.controllers';

export const commentPosts = Router();

// accoounts/:accountid/posts/:postid/comments

commentPosts
  .route('/:accountid/posts/:postid/comments')

  // Return all published comments of a specific post - OK
  .get(expressAsyncHandler(CommentControl.getCommentsOfPost));

