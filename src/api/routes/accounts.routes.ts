import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AccountControl } from '../controllers/accounts.controllers';

export const accounts = Router();
export const signup = Router();

// signup/
signup.route('/').post(expressAsyncHandler(AccountControl.createAccount));

// accounts/
accounts
  .route('/')

  // Return a list of accounts
  // TODO Verify Admin
  .get(expressAsyncHandler(AccountControl.getAccounts));

// accounts/:accountid
accounts
  .route('/:accountid')

  // Returns a single account info
  .get(expressAsyncHandler(AccountControl.getOneAccount));
