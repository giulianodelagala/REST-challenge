import {Router} from 'express';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport'

import {accounts, signup} from './api/controllers/accounts';
import {comments} from './api/controllers/comments';
import {posts} from './api/controllers/posts';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(passport.initialize())
app.use(passport.session())

app.use('/accounts', accounts);
app.use('/comments', comments);
app.use('/posts', posts);
app.use('/signup', signup)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);
