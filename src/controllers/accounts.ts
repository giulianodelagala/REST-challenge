import express from 'express';
import { Router } from 'express';

export const accounts = Router()

// middleware that is specific to this router
accounts.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
accounts.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
accounts.get('/about', function (req, res) {
  res.send('About birds')
})

// module.exports = accounts
