import { Router } from "express";
import { accounts, signup } from "./api/controllers/accounts.controllers";
import { login } from "./api/controllers/auth.controllers";
import { comments } from "./api/controllers/comments.controllers";
import { me } from "./api/controllers/me.controllers";
import { posts } from "./api/controllers/posts.controllers";

const expressRouter = Router();

export function router(app: Router): Router {
  app.use('/accounts/me', me)
  app.use('/accounts', accounts);
  app.use('/comments', comments);
  app.use('/posts', posts);
  app.use('/signup', signup);
  app.use('/login', login);

  return expressRouter;
}
