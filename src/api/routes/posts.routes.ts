import { NextFunction, Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { PostControl } from '../controllers/posts.controllers';

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

// Delete an existing post
// // TODO verifyAdmin
// .delete(
//   auth.verifyUser,
//   async (req: GetUserSession, res: Response, next: NextFunction) => {
//     try {
//       const record = await getOnePost(Number(req.params.postid));

//       // Verify if User is author
//       if (record?.userId !== req.user?.id) {
//         return next(createHttpError(403, 'You are not authorized'));
//       }

//       const query = await deletePost(Number(req.params.postid));

//       res.status(200).json({ data: { record } });
//     } catch (e) {
//       // if (res.statusCode === 403) {
//       //   res.end();
//       // }
//       // res.status(400).end();
//       res.end();
//     }
//   },
// );

// accounts/:accountid/posts
accountsPosts
  .route('/:accountid/posts')
  // Returns all published posts of a specific user
  .get(expressAsyncHandler(PostControl.getPostsOfAccount));

accountsPosts
  .route('/:accountid/posts/:postid')
  // Returns a specific post of a specific user
  .get(expressAsyncHandler(PostControl.getOnePost));
