import passport from 'passport';
import passportLocal from 'passport-local';


import { PrismaClient } from '@prisma/client';

import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();


const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

import { Error401 } from '../utils/httperrors'

// JWT config

exports.verifyUser = (req: any, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false, }, async (error, token) => {
        if (error || !token) {
            // res.status(401).json({ message: 'Unauthorized' });
            res.status(401).json(Error401);
        }
        try {
            const user = await prisma.users.findUnique({
                where: { id: token.id },
            });
            req.user = user;
        } catch (error) {
            next(error);
        }
        next();
    })(req, res, next);
}

