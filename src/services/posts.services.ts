import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type bodyRequest = {
  id: number;
  title: string;
  content: string;
  user: number;
  isPublished?: boolean;
};

type createBody = Omit<bodyRequest, 'id'>;
type updateBody = Partial<Omit<bodyRequest, 'user'>>;

export const createPost = async (id: number, body: createBody) => {
  const query = await prisma.posts.create({
    data: {
      title: body.title,
      content: body.content,
      isPublished: body.isPublished,
      user: {
        connect: { id: id },
      },
    },
  });

  return query;
};

export const updatePost = async (postId: number, body: updateBody) => {
  const query = await prisma.posts.update({
    where: {
      id: postId,
    },
    data: {
      title: body.title,
      content: body.content,
      isPublished: body.isPublished,
    },
  });

  return query;
};

export const deletePost = async (id: number) => {
  const query = await prisma.posts.delete({
    where: {
      id: id,
    },
  });

  return query;
};

export const getOnePost = async (id: number) => {
  const query = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });

  return query;
};

export const getPosts = async () => {
  const query = await prisma.posts.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return query;
};

export const getPostsOfUser = async (userId: number) => {
  const query = await prisma.posts.findMany({
    where: {
      userId: userId,
      isPublished: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return query;
};
