import createError, { HttpError } from 'http-errors';
import { response, Response } from 'express';

export const Error400 = {
  title: 'Error: Bad Request',
  status: 400,
  message: 'Bad request',
};

export const Error401 = {
  title: 'Error: Unauthorized',
  status: 401,
  message: 'You are not authorized, please log in',
};

export const Error401Email = {
  title: 'Error: Unauthorized',
  status: 401,
  message: 'Your email is not verified',
};

export const Error403 = {
  title: 'Error: Forbidden',
  status: 403,
  message: 'You are not authorized to perform this operation',
};

export const Error404 = {
  title: 'Error: Not Found',
  status: 404,
  message: 'Resource not found',
};

// export const resError = (err: HttpError) => {
//   let res: Response = {
//     status: {
//       code: err.statusCode
//     }
//   }
//   return ({
//     title: 'Error',
//     status: error.statusCode,
//     message: error.message });
// }
