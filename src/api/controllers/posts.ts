import {Router} from 'express';
import {createPost, deletePost, getOnePost, getPosts} from '../../services/posts';

export const posts = Router();

// define the posts route
posts
  .route('/')

  // Return a list of published Posts
  .get(async (req, res) => {
    try {
      const query = await getPosts();

      res.status(200).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  })

  // Create a Post
  // TODO Verificar si tiene auth para crear
  .post(async (req, res) => {
    try {
      // console.log('in controller: ', req.body);
      const query = await createPost(req.body);

      res.status(201).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  });

posts
  .route('/:postid')

  // Returns a single post
  .get(async (req, res) => {
    try {
      const query = await getOnePost(Number(req.params.postid));

      res.status(200).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  })

  // Delete an existing post
  // TODO Verificar si tiene autorizacion para borrar
  .delete(async (req, res) => {
    try {
      const record = await getOnePost(Number(req.params.postid));
      const query = await deletePost(Number(req.params.postid));

      res.status(200).json({data: {record}});
    } catch (e) {
      res.status(400).end();
    }
  });
