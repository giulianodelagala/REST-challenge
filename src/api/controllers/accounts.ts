import {Router} from 'express';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  getOneAccount,
  updateAccount,
} from '../../services/accounts';

export const accounts = Router();
export const signup = Router();

// type bodyAccountRequest = {
//   id: number;
//   username?: string;
//   password?: string;
//   email?: string;
//   name?: string;
//   isNamePublic?: boolean;
//   isEmailPublic?: boolean;
// };

signup.route('/').post(async (req, res) => {
  try {
    const query = await createAccount(req.body);

    res.status(201).json({data: {query}});
  } catch (e) {
    res.status(400).end();
  }
});

// define the posts route
accounts
  .route('/')

  // Return a list of published Posts
  .get(async (req, res) => {
    try {
      const query = await getAccounts();

      res.status(200).json({data: {query}});
    } catch (e) {
      res.status(400).end();
    }
  });

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

// // Create a Post
// // TODO Verificar si tiene auth para crear
// .post(async (req, res) => {
//   try {
//     console.log('in controller: ', req.body);
//     const query = await createPost(req.body);

//     res.status(201).json({data: {query}});
//   } catch (e) {
//     res.status(400).end();
//   }
// });

// posts
//   .route('/:postid')

//   // Returns a single post
//   .get(async (req, res) => {
//     try {
//       const query = await getOnePost(Number(req.params.postid));

//       res.status(200).json({data: {query}});
//     } catch (e) {
//       res.status(400).end();
//     }
//   })

//   // Delete an existing post
//   // TODO Verificar si tiene autorizacion para borrar
//   .delete(async (req, res) => {
//     try {
//       const record = await getOnePost(Number(req.params.postid));
//       const query = await deletePost(Number(req.params.postid));

//       res.status(200).json({data: {record}});
//     } catch (e) {
//       res.status(400).end();
//     }
//   });
