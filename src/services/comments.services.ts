import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BodyComments {
  //id: number;
  content: string;
  isPublished?: boolean;
  userId: number;
  postId: number;
}

type UpdateBody = Omit<BodyComments, 'userId' | 'postId'>

export const createComment = async (body: BodyComments, postId: number) => {
  const query = await prisma.comments.create({
    data: {
      content: body.content,
      isPublished: body.isPublished != null ? body.isPublished : undefined,
      user: {
        connect: {
          id: body.userId
        }
      },
      post: {
        connect: {
          id: postId
        }
      }
    },
  });
  return query
};

export const updateComment = async (comnentId: number, body: UpdateBody) => {
  const query = await prisma.comments.update({
    where: {
      id: comnentId,
    },
    data: {
      // content: body.content,
      ...body
    },
  });
  return query
};

export const deleteComment = async (commentId: number) => {
  const query = await prisma.comments.delete({
    where: {
      id: commentId,
    },
  });
  return query
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