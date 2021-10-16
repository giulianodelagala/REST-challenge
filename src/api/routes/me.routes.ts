import { NextFunction, Request, Response, Router } from 'express';

import {
  validateAuthorComment,
  validateAuthorPost,
} from '../middlewares/validator.middle';

import * as auth from '../middlewares/auth.middle';

import { MeControl } from '../controllers/me.controllers';
import { PostControl } from '../controllers/posts.controllers';
import expressAsyncHandler from 'express-async-handler';
import { CommentControl } from '../controllers/comments.controllers';

export const me = Router();

/*
  account
*/
me.route('/')
  // Returns ME account info
  .get(auth.verifyUser, expressAsyncHandler(MeControl.getUserAccount))

  // Update ME account
  // TODO restrict some changes ROLE!
  .put(
    auth.verifyUser,
    expressAsyncHandler(MeControl.updateAccount),
    expressAsyncHandler(MeControl.getUserAccount),
  )

  // Delete ME account
  .delete(auth.verifyUser, expressAsyncHandler(MeControl.deleteAccount));

/*
  Posts
*/
// accounts/me/posts
me.route('/posts')
  // Returns a list of posts of user logged
  .get(auth.verifyUser, expressAsyncHandler(PostControl.getPostsOfUser))

  // Create a Post
  .post(auth.verifyUser, expressAsyncHandler(PostControl.createPost));

// accounts/me/posts/:postid

me.route('/posts/:postid')
  // Returns a specific post of user logged
  .get(
    auth.verifyUser,
    validateAuthorPost,
    expressAsyncHandler(PostControl.getOnePost),
  )

  // Update an existing post
  .put(
    auth.verifyUser,
    validateAuthorPost,
    expressAsyncHandler(PostControl.updatePost),
    expressAsyncHandler(PostControl.getOnePost),
  )

  // Delete an existing post
  .delete(
    auth.verifyUser,
    validateAuthorPost,
    expressAsyncHandler(PostControl.deletePost),
  );

/*
  Comments
*/
me.route('/posts/:postid/comments')
  // create a comment or draft - OK
  .post(auth.verifyUser, expressAsyncHandler(CommentControl.createComment));

me.route('/posts/:postid/comments/:commentid')
  // Update an existing comment - OK
  .put(
    auth.verifyUser,
    validateAuthorComment,
    expressAsyncHandler(CommentControl.updateComment),
    expressAsyncHandler(CommentControl.getOneCommentOfPost),
  )

  // Delete an existing comment - OK
  .delete(
    auth.verifyUser,
    validateAuthorComment,
    expressAsyncHandler(CommentControl.deleteComment),
  );
