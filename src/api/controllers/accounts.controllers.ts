import { Verify } from 'crypto';
import { Router } from 'express';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  getOneAccount,
  updateAccount,
} from '../../services/accounts.services';

import * as auth from '../middlewares/auth.middle';
import { Error404 } from '../utils/httperrors';
import { dataWrap } from '../utils/wrappers';

export const accounts = Router();
export const signup = Router();

// signup/
signup.route('/').post(async (req, res) => {
  try {
    const query = await createAccount(req.body);

    res.status(201).json({ data: { query } });
  } catch (e) {
    res.status(400).end();
  }
});

// accounts/
accounts
  .route('/')

  // Return a list of accounts
  // TODO Verify Admin
  .get(async (req, res) => {
    try {
      const query = await getAccounts();

      res.status(200).json({ data: { query } });
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

      res.status(200).json({ data: { query } });
    } catch (e) {
      res.status(400).end();
    }
  })

  // // Update an existing account
  // // TODO restrict some changes ROLE!
  // .put(auth.verifyUser, async (req, res) => {
  //   try {
  //     const query = await updateAccount(Number(req.params.accountid), req.body);
  //     const record = await getOneAccount(Number(req.params.accountid));

  //     if (record) {
  //       return res.status(200).json(dataWrap(record));
  //     } else {
  //       return res.status(404).json(Error404);
  //     }

  //   } catch (e) {
  //     res.status(400).end();
  //   }
  // })

  // // Delete an existing account
  // .delete(auth.verifyUser, async (req, res) => {
  //   try {
  //     const record = await getOneAccount(Number(req.params.accountid));
  //     const query = await deleteAccount(Number(req.params.accountid));
  //   } catch (e) {
  //     res.status(400).end();
  //   }
  // });
