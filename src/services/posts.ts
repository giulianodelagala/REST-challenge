import {PrismaClient} from '@prisma/client'
import {title} from 'process'

const prisma = new PrismaClient()

export const createPost = async (
  title: string,
  content: string,
  user: number,
  isPublished?: boolean,
) => {
  const query = await prisma.posts.create({
    data: {
      title: title,
      content: content,
      isPublished: isPublished,
      user: {
        connect: {id: user},
      },
    },
  })
  console.log(query)
}

export const updatePost = async (
  id: number,
  title: string,
  content: string,
  isPublished?: boolean,
) => {
  const query = await prisma.posts.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      isPublished: isPublished,
    },
  })
  console.log(query)
}

export const deleteComment = async (id: number) => {
  const query = await prisma.posts.delete({
    where: {
      id: id,
    },
  })
  console.log(query)
}

export const getOnePost = async (id: number) => {
  const query = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  })
  //console.log(query)
  return query
}

export const getPosts = async () => {
  const query = await prisma.posts.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
  console.log(query)
  return query
}

export const getPostsOfUser = async (userId: number) => {
  const query = await prisma.posts.findMany({
    where: {
      userId: userId,
      isPublished: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
  console.log(query)
  return query
}
