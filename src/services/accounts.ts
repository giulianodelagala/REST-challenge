import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

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
  const query = await prisma.users.create({
    data: {
      ...body
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
