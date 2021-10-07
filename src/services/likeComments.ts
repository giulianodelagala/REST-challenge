import { PrismaClient } from '@prisma/client';
import { createLikeComment, toggleLikeComment } from '../types';

const prisma = new PrismaClient();

export const createLike = async (body: createLikeComment) => {
  const query = await prisma.likePost.create({
    data: {
      isLike: body.isLike,
      userId: body.userId,
      postOrCommentId: body.postOrCommentId,
      publishingType: body.publishingType,
    },
  });
  console.log(query);
};

export const UpdateLike = async (body: toggleLikeComment) => {
  const query = await prisma.likePost.create({
    data: {
      id: body.id,
      isLike: body.isLike,
      userId: body.userId,
      postOrCommentId: body.postOrCommentId,
      publishingType: body.publishingType,
    },
  });
  console.log(query);
};




