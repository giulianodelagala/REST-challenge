import { Router } from 'express';
import { accounts, signup } from './api/routes/accounts.routes';
import { emailconfirm, login } from './api/routes/auth.routes';
import { commentPosts } from './api/routes/comments.routes';

import { me } from './api/routes/me.routes';
import { accountsPosts, posts } from './api/routes/posts.routes';
// import {
//   commentReports,
//   postReports,
// } from './api/controllers/reports.controllers';
import {
  commentDislike,
  commentLike,
  postDislike,
  postLike,
} from './api/routes/like.routes';

const expressRouter = Router();

export function router(app: Router): Router {
  app.use('/accounts/me', me);
  //app.use('/accounts/me/posts', postReports);
  //app.use('/accounts/me/comments', commentReports);

  app.use('/accounts/me', [commentDislike, commentLike]);
  app.use('/accounts/me', [postLike, postDislike]);

  // accounts
  // accounts/:accountid
  app.use('/accounts', accounts);

  // accoounts/:accountid/posts/:postid/comments
  app.use('/accounts', commentPosts);

  // accounts/:accountid/posts
  app.use('/accounts', accountsPosts);

  // /posts
  app.use('/posts', posts);

  app.use('/signup', signup);
  app.use('/login', login);
  app.use('/emailconfirm', emailconfirm);

  return expressRouter;
}
