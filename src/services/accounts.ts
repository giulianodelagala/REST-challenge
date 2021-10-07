import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const saltRounds = 10;


type bodyAccountRequest = {
  username: string;
  password: string;
  email: string;
  name?: string;
  isNamePublic?: boolean;
  isEmailPublic?: boolean;
};

export const createAccount = async (
  body: bodyAccountRequest
) => {
  const cryptPassword = bcrypt.hashSync(body.password, saltRounds);
  const newBody = { ...body, password: cryptPassword }

  const query = await prisma.users.create({
    data: {
      ...newBody
    },
  });
  console.log(query);
};

export const getAccounts = async () => {
  const query = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      emailVerifiedAt: true,
      role: true,
    },
    orderBy: {
      updatedAt: 'asc',
    },
  });
  // console.log(query);
  return query;
};

export const getOneAccount = async (id: number) => {
  const query = await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      emailVerifiedAt: true,
      role: true,
    },
  });
  // console.log(query);
  return query;
};

export const updateAccount = async (
  id: number,
  body: Partial<bodyAccountRequest>,
) => {
  const query = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      ...body,
    },
  });
  console.log(query);
};

export const deleteAccount = async (id: number) => {
  const query = await prisma.users.delete({
    where: {
      id: id,
    },
  });
  // console.log(query);
};
