import passport from 'passport';

import { PrismaClient } from '@prisma/client';

import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

import { Error401 } from '../utils/httperrors';

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
