import passport from 'passport';

import { PrismaClient } from '@prisma/client';

import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

import { Error401, Error403 } from '../utils/httperrors';
import { GetUserRoleRequest, GetUserSession } from '../utils/definitions';

// JWT config

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, async (error, token) => {
    if (error || !token) {
      res.status(401).json(Error401);
    }
    try {
      const user = await prisma.users.findUnique({
        where: { id: token.id },
      });
      if (user){
        req.user = user;
      }
    } catch (error) {
      next(error);
    }
    next();
  })(req, res, next);
};

export const verifyAdmin = (
  req: GetUserRoleRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role === 'MODERATOR') {
    return next();
  } else {
    const err = new Error('You are not a Moderator!, ');
    res.status(403).json(Error403);
    return next(err);
  }
};