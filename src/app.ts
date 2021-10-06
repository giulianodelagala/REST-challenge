import { Router } from 'express';
import express from 'express'
import morgan from 'morgan'

import { accounts } from './controllers/accounts';
import { comments } from './controllers/comments';
import { posts } from './controllers/posts';



const app = express();

app.use(morgan('dev'));

app.use('/accounts', accounts)
app.use('/comments', comments)
app.use('/posts', posts)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
