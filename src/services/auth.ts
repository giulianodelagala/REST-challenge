import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type BodyAuth = {
  username: string;
  password: string;
};

export const checkPassword = async (body: BodyAuth) => {
  const query = await prisma.users.findUnique({
    where: {
      username: body.username
    },
  });

  if (!query){

  }
};
