import express from 'express';
import morgan from 'morgan';
import passport from 'passport'

import { router } from './router';

// Load passport config
const pass = require('./api/middlewares/passport.middle');
const auth = require('./api/middlewares/auth.middle')

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(
//   require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//   }),
// );
app.use(passport.initialize())
// app.use(passport.session())

// Defining routes
app.use('/', router(app));

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);
