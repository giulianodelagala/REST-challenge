import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { deleteComment } from '../../services/comments.services';

import { CommentControl } from '../controllers/comments.controllers';
import { verifyAdmin, verifyUser } from '../middlewares/auth.middle';

export const commentPosts = Router();

// accoounts/:accountid/posts/:postid/comments

commentPosts
  .route('/:accountid/posts/:postid/comments')

  // Return all published comments of a specific post - OK
  .get(expressAsyncHandler(CommentControl.getCommentsOfPost));

commentPosts
  .route('/:accountid/posts/:postid/comments/:commentid')
  // Delete a comment by Moderator user
  .delete(
    verifyUser,
    verifyAdmin,
    expressAsyncHandler(CommentControl.deleteComment),
  );
