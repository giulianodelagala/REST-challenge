import { NextFunction, Request, Response } from "express";
import { createAccount, getAccounts, getOneAccount } from "../../services/accounts.services";
import { Error403, Error404 } from "../utils/httperrors";
import { dataWrap } from "../utils/wrappers";


export class AccountControl {
  static async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await createAccount(req.body);

      if (query) {
        return res.status(201).json(dataWrap(query));
      } else {
        return res.status(403).json(Error403);
      }
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  }

  // TODO Verify Admin
  static async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await getAccounts();

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error403);
      }
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  }

  static async getOneAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await getOneAccount(Number(req.params.accountid));

      if (query) {
        return res.status(200).json(dataWrap(query));
      } else {
        return res.status(404).json(Error403);
      }
    } catch (e) {
      return res.status(400).json(JSON.stringify(e));
    }
  }
}

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
