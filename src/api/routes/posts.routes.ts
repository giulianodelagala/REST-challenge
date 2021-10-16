import { NextFunction, Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { PostControl } from '../controllers/posts.controllers';
import { verifyAdmin, verifyUser } from '../middlewares/auth.middle';

export const posts = Router();
export const accountsPosts = Router();

// /posts
posts
  .route('/')
  // Return a list of published Posts
  .get(expressAsyncHandler(PostControl.getPosts));

posts
  .route('/:postid')
  // Returns a single post
  .get(expressAsyncHandler(PostControl.getOnePost));

// accounts/:accountid/posts
accountsPosts
  .route('/:accountid/posts')
  // Returns all published posts of a specific user
  .get(expressAsyncHandler(PostControl.getPostsOfAccount));

accountsPosts
  .route('/:accountid/posts/:postid')
  // Returns a specific post of a specific user
  .get(expressAsyncHandler(PostControl.getOnePost))

  // Delete Post by Moderator user
  .delete(verifyUser, verifyAdmin, expressAsyncHandler(PostControl.deletePost));
