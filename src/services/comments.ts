import { PrismaClient } from '@prisma/client';
import { createComments, updateComments } from '../types';

const prisma = new PrismaClient();

export const createComment = async (body: createComments) => {
  const query = await prisma.comments.create({
    data: {
      content: body.content,
      postId: body.postId,
      userId: body.userId,
      likeCounter: 0,
      dislikeCounter: 0,
    },
  });
  console.log(query);
};

export const updatecomment = async (body: updateComments) => {
  const query = await prisma.comments.update({
    where: {
      id: body.id,
    },
    data: {
      content: body.content,
    },
  });
  console.log(query);
};

export const deleteComment = async (id: number) => {
  const query = await prisma.comments.delete({
    where: {
      id: id,
    },
  });
  console.log(query);
};

export const showComment = async (id: number) => {
  const query = await prisma.comments.findUnique({
    where: {
      id: id,
    },
  });
  //console.log(query)
  return query;
};

export const showAllComments = async () => {
  const query = await prisma.comments.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });
  console.log(query);
  return query;
};
