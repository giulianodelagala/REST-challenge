import { Request } from 'express';

// export interface GetUserIdRequest extends Request {
//   user?: {
//     id?: number;
//   }
// }

export interface GetUserSession extends Request {
  user?: {
    id?: number;
  };
  // session ?: any;
}

export interface GetUserRoleRequest extends Request {
  user?: {
    role?: 'USER' | 'MODERATOR';
  };
}

export interface GetExpressUserId extends Express.User {
  id?: number;
}
