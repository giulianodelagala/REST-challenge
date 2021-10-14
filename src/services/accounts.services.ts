import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { getCodeVerify } from '../api/utils/functions';
import { sendEmail } from '../api/utils/sendgrid-mail';

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
type bodyVerifyAccount = {
  password: string;
  email: string;
  verifyCode: string;
}

export const createAccount = async (body: bodyAccountRequest) => {
  const cryptPassword = bcrypt.hashSync(body.password, saltRounds);
  const newBody = {
    ...body,
    password: cryptPassword,
    verifyCode: getCodeVerify(),
  };
  const upsertUser = await prisma.users.upsert({
    where: {
      email: newBody.email,
    },
    update: {
      verifyCode: newBody.verifyCode,
    },
    create: {
      ...newBody
    },
  });
  try {
    sendEmail(upsertUser.email, String(upsertUser.verifyCode));
  } catch (e) {
    console.error(e);
  }
  console.log(upsertUser)
  /*
  const query = await prisma.users.create({
    data: {
      ...newBody,
    },
  });
  console.log(query);*/
  return upsertUser;
};

export const verifyAccount = async (body: bodyVerifyAccount) => {
  const findUserNotVerified = await prisma.users.findMany({
    where: {
      email: body.email,
      emailVerifiedAt: null
    },
    select: {
      id: true,
      verifyCode: true,
    },
  });
  const userSelected = findUserNotVerified[0];

  let confirmationResponse = null

  console.log(userSelected.verifyCode);
  console.log(body.verifyCode)

  if (userSelected.verifyCode == body.verifyCode) {
    const updateUser = await prisma.users.update({
      where: {
        email: body.email,
      },
      data: {
        emailVerifiedAt: new Date(),
      },
    })
    console.log(updateUser)
    confirmationResponse = updateUser
  }
  return confirmationResponse
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

export const getUserAccount = async (id: number) => {
  const query = await prisma.users.findUnique({
    where: {
      id: id,
    },
    select : {
      password: false,
      username: true,
      name: true,
      isNamePublic: true,
      isEmailPublic: true,
      role: true,
      createdAt: true,
    }
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
