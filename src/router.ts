import { Router } from "express";
import { accounts, signup } from "./api/controllers/accounts.controllers";
import { emailconfirm, login } from "./api/controllers/auth.controllers";
import { commentPosts } from "./api/controllers/comments.controllers";
import { commentLike, postLike } from "./api/controllers/like.controllers";
import { me } from "./api/controllers/me.controllers";
import { accountsPosts, posts } from "./api/controllers/posts.controllers";
import { commentReports, postReports } from "./api/controllers/reports.controllers";

const expressRouter = Router();

export function router(app: Router): Router {
  app.use('/accounts/me', me);
  app.use('/accounts/me/posts', postReports);
  app.use('/accounts/me/comments', commentReports);

  app.use('/accounts/me', commentLike);
  app.use('/accounts/me', postLike);

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
