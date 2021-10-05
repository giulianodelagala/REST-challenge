import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const createComment = async (
  id: number,
  content: string,
  post_id: number,
  user_id: number,
) => {
  const query = await prisma.comments.create({
    data: {
      id: id,
      content: content,
      postId: post_id,
      userId: user_id,
      isPublished: true,
      likeCounter: 0,
      dislikeCounter: 0
    },
  })
  console.log(query)
}

export const updatecomment = async (id: number, content: string) => {
  const query = await prisma.comments.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  })
  console.log(query)
}

export const deleteComment = async (id: number) => {
  const query = await prisma.comments.delete({
    where: {
      id: id,
    },
  })
  console.log(query)
}

export const showComment = async (id: number) => {
  const query = await prisma.comments.findUnique({
    where: {
      id: id,
    },
  })
  console.log(query)
}

export const showAllComments = async () => {
  const query = prisma.comments.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  })
  console.log(query)
}
