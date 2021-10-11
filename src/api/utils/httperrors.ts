import createError, { HttpError } from 'http-errors';
import { response, Response } from 'express';

export const Error401 = {
  'title': 'Error',
  'status': 401,
  'message': 'You are not authorized'};

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

