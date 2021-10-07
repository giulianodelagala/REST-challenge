import {Router} from 'express';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  getOneAccount,
  updateAccount,
} from '../../services/accounts';
import { deletePost, getOnePost, getPostsOfUser, updatePost } from '../../services/posts';

export const accounts = Router();
export const signup = Router();

signup.route('/').post(async (req, res) => {
  try {
    const query = await createAccount(req.body);

    res.status(201).json({data: {query}});
  } catch (e) {
    res.status(400).end();
  }
});

// accounts/
accounts
  .route('/')

  // Return a list of accounts
  .get(async (req, res) => {
    try {
      const query = await getAccounts();

      res.status(200).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  });

// accounts/:accountid
accounts
  .route('/:accountid')

  // Returns a single account info
  .get(async (req, res) => {
    try {
      const query = await getOneAccount(Number(req.params.accountid));

      res.status(200).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  })

  // Update an existing account
  .put(async (req, res) => {
    try {
      const query = await updateAccount(Number(req.params.accountid), req.body);
      const record = await getOneAccount(Number(req.params.accountid));

      res.status(200).json({data: {record}});
    } catch (e) {
      res.status(400).end();
    }
  })

  // Delete an existing account
  .delete(async (req, res) => {
    try {
      const record = await getOneAccount(Number(req.params.accountid));
      const query = await deleteAccount(Number(req.params.accountid));
    } catch (e) {
      res.status(400).end();
    }
  });

// accounts/me/posts

accounts
  .route('/me/posts')

  // Returns a list of posts of user logged
  .get(async (req, res) => {
    try {
      const userId = 1; //TODO get userId from Token
      const query = await getPostsOfUser(userId);

      res.status(200).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  });

accounts
  .route('/me/posts/:postid')

  // Returns a specific post of user logged
  .get(async (req, res) => {
    try {
      //TODO Verify user
      const userId = 1; //TODO get userId from Token
      const query = await getOnePost(Number(req.params.postid));

      res.status(200).json({ data: { query } });
    } catch (e) {
      res.status(400).end();
    }
  })

  // Update an existing post
  .put(async (req, res) => {
    try {
      //TODO Verify user
      const userId = 1; //TODO get userId from Token
      const query = await updatePost(req.body);

      res.status(200).json({ data: { query } });
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

      res.status(200).json({ data: { record } });
    } catch (e) {
      res.status(400).end();
    }
  });