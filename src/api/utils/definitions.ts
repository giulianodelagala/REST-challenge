import { Request } from 'express';

export interface GetUserSession extends Request {
  user?: {
    id?: number;
  };
}

export interface GetUserRoleRequest extends Request {
  user?: {
    role?: 'USER' | 'MODERATOR';
  };
}
