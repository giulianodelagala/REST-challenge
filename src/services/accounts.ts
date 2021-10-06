import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type bodyRequest = {
  id: number;
  title: string;
  content: string;
  user: number;
  isPublished?: boolean;
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
  });
  // console.log(query);
  return query;
};

export const updatecomment = async (id: number, content: string) => {
  const query = await prisma.comments.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
  console.log(query);
};

// export const createAccount = async (
//   id: number,
//   content: string,
//   post_id: number,
//   user_id: number,
// ) => {
//   const query = await prisma.comments.create({
//     data: {
//       id: id,
//       content: content,
//       postId: post_id,
//       userId: user_id,
//       isPublished: true,
//       likeCounter: 0,
//       dislikeCounter: 0,
//     },
//   })
//   console.log(query)
// }

// export const updatecomment = async (id: number, content: string) => {
//   const query = await prisma.comments.update({
//     where: {
//       id: id,
//     },
//     data: {
//       content: content,
//     },
//   })
//   console.log(query)
// }

// export const deleteComment = async (id: number) => {
//   const query = await prisma.comments.delete({
//     where: {
//       id: id,
//     },
//   })
//   console.log(query)
// }

// export const showComment = async (id: number) => {
//   const query = await prisma.comments.findUnique({
//     where: {
//       id: id,
//     },
//   })
//   //console.log(query)
//   return query
// }

// export const showAllComments = async () => {
//   const query = await prisma.comments.findMany({
//     orderBy: {
//       updatedAt: 'desc',
//     },
//   })
//   console.log(query)
//   return query
// }
