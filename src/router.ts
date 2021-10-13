import { Router } from "express";
import { accounts, signup } from "./api/controllers/accounts.controllers";
import { login } from "./api/controllers/auth.controllers";
import { commentPosts } from "./api/controllers/comments.controllers";
import { commentLike } from "./api/controllers/like.controllers";
import { me } from "./api/controllers/me.controllers";
import { accountsPosts, posts } from "./api/controllers/posts.controllers";
import { commentReports, postReports } from "./api/controllers/reports.controllers";

const expressRouter = Router();

export function router(app: Router): Router {
  app.use('/accounts/me', me)
  app.use('/accounts/me/posts', postReports)
  app.use('/accounts/me/comments', commentReports);

  app.use('/accounts/me', commentLike);

  app.use('/accounts', accounts);
  app.use('/accounts', commentPosts);

  app.use('/posts', posts);
  app.use('/accounts', accountsPosts)

  app.use('/signup', signup);
  app.use('/login', login);

  return expressRouter;
}
