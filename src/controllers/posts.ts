import express from 'express'
import { Router } from 'express'
import { getPosts } from '../services/posts'

export const posts = Router()

// // middleware that is specific to this router
// posts.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the home page route
posts.get('/', async (req, res) => {
  const query = await getPosts();
  res.send(query)
})

// // define the about route
// posts.get('/about', async function (req, res) {
//   const response = await showComment(1)
//   //console.log(response);
//   res.send(response)
// })

// module.exports = accounts
