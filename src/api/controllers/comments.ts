import express from 'express'
import { Router } from 'express'
import { showComment } from '../../services/comments'

export const comments = Router()

// middleware that is specific to this router
comments.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
comments.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
comments.get('/about', async function (req, res) {
  const response = await showComment(1);
  //console.log(response);
  res.send(response)
})

// module.exports = accounts
