import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BodyComments {
  content: string;
  isPublished?: boolean;
}

type UpdateBody = Omit<BodyComments, 'userId' | 'postId'>;

export const createComment = async (
  userId: number,
  postId: number,
  body: BodyComments,
) => {
  const query = await prisma.comments.create({
    data: {
      content: body.content,
      isPublished: body.isPublished != null ? body.isPublished : undefined,
      user: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });

  return query;
};

export const updateComment = async (commentId: number, body: UpdateBody) => {
  const query = await prisma.comments.update({
    where: {
      id: commentId,
    },
    data: {
      ...body,
    },
  });

  return query;
};

export const deleteComment = async (commentId: number) => {
  const query = await prisma.comments.delete({
    where: {
      id: commentId,
    },
  });

  return query;
};

export const getComment = async (id: number) => {
  const query = await prisma.comments.findUnique({
    where: {
      id: id,
    },
  });

  return query;
};

export const getAllComments = async () => {
  const query = await prisma.comments.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return query;
};

export const getCommentsOfPost = async (postId: number) => {
  const query = await prisma.comments.findMany({
    where: {
      postId: postId,
      isPublished: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return query;
};

export const getOneCommentOfPost = async (
  postId: number,
  commentId: number,
) => {
  const query = await prisma.comments.findMany({
    where: {
      id: commentId,
      postId: postId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return query;
};
