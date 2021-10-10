import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

type bodyRequest = {
  id: number;
  title: string;
  content: string;
  user: number;
  isPublished?: boolean;
};

type createBody = Omit<bodyRequest, 'id'>;
type updateBody = Omit<bodyRequest, 'user'>;

export const createPost = async (id: number,body: createBody) => {
  console.log(body);
  const query = await prisma.posts.create({
    data: {
      title: body.title,
      content: body.content,
      isPublished: body.isPublished,
      user: {
        connect: {id: id},
      },
    },
  });
  //console.log(query)
};

export const updatePost = async (body: updateBody) => {
  const query = await prisma.posts.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      isPublished: body.isPublished,
    },
  });
  // console.log(query);
};

export const deletePost = async (id: number) => {
  const query = await prisma.posts.delete({
    where: {
      id: id,
    },
  });
  // console.log(query);
};

export const getOnePost = async (id: number) => {
  const query = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });
  // console.log(query);
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
  console.log(query);
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
  console.log(query);
  return query;
};
