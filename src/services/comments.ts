import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';
import { createComments, updateComments } from '../types';

const prisma = new PrismaClient();

interface BodyComments {
  //id: number;
  content: string;
  isPublished?: boolean;
  //likeCounter: number;
  //dislikeCounter: number;
  //createdAt: Date;
  //updatedAt: Date;
  userId: number;
  postId: number;
}

type UpdateBody = Omit<BodyComments, 'userId' | 'postId'>

export const createComment = async (body: BodyComments) => {
  const query = await prisma.comments.create({
    data: {
      // content: body.content,
      // postId: body.postId,
      // userId: body.userId,
      //likeCounter: 0,
      //dislikeCounter: 0,
      content: body.content,
      isPublished: body.isPublished != null ? body.isPublished : undefined,
      user: {
        connect: {
          id: body.userId
        }
      },
      post: {
        connect: {
          id: body.postId
        }
      }
    },
  });
  console.log(query);
};

export const updateComment = async (id: number, body: UpdateBody) => {
  const query = await prisma.comments.update({
    where: {
      id: id,
    },
    data: {
      // content: body.content,
      ...body
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
