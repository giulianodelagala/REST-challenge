import { PrismaClient, PublishingType } from '@prisma/client';


const prisma = new PrismaClient();

export const setLike = async (
  userId: number,
  postOrCommentId: number,
  publishingType: PublishingType
) => {

  const findLikeId = await prisma.likePost.findMany({
    where: {
      userId: userId,
      postOrCommentId: postOrCommentId,
    },
    select: {
      id: true
    }
  });

  const idSelected = findLikeId[0] || undefined

  const query = await prisma.likePost.upsert({
    where: {
      id: idSelected.id,
    },
    update: {
      isLike: true,
    },
    create: {
      isLike: true,
      user: {
        connect: {
          id: userId,
        },
      },
      postOrCommentId: postOrCommentId,
      publishingType: publishingType,
    },
  });
  return query;
};

export const setDislike = async (
  userId: number,
  postOrCommentId: number,
  publishingType: PublishingType

) => {

  const findLikeId = await prisma.likePost.findMany({
    where: {
      userId: userId,
      postOrCommentId: postOrCommentId,
    },
    select: {
      id: true
    }
  });

  const idSelected = findLikeId[0] || undefined

  const query = await prisma.likePost.upsert({
    where: {
      id: idSelected.id,
    },
    update: {
      isLike: false,
    },
    create: {
      isLike: false,
      user: {
        connect: {
          id: userId,
        },
      },
      postOrCommentId: postOrCommentId,
      publishingType: publishingType
    },
  });
  return query;
};