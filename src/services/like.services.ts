import { PrismaClient, PublishingType } from '@prisma/client';

const prisma = new PrismaClient();

export const setLike = async (
  userId: number,
  postOrCommentId: number,
  publishingType: PublishingType,
) => {
  const findLikeId = await prisma.likeDislikes.findMany({
    where: {
      userId: userId,
      postOrCommentId: postOrCommentId,
      publishingType: publishingType,
    },
    select: {
      id: true,
      isLike: true,
    },
  });

  const idSelected = findLikeId[0];
  let query = null;

  if (idSelected) {
    query = await prisma.likeDislikes.update({
      where: {
        id: idSelected.id,
      },
      data: {
        isLike: true,
      },
    });
  } else {
    query = await prisma.likeDislikes.create({
      data: {
        isLike: true,
        postOrCommentId: postOrCommentId,
        publishingType: publishingType,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  return query;
};

export const setDislike = async (
  userId: number,
  postOrCommentId: number,
  publishingType: PublishingType,
) => {
  const findLikeId = await prisma.likeDislikes.findMany({
    where: {
      userId: userId,
      postOrCommentId: postOrCommentId,
      publishingType: publishingType,
    },
    select: {
      id: true,
    },
  });

  const idSelected = findLikeId[0];
  let query = null;

  if (idSelected) {
    query = await prisma.likeDislikes.update({
      where: {
        id: idSelected.id,
      },
      data: {
        isLike: false,
      },
    });
  } else {
    query = await prisma.likeDislikes.create({
      data: {
        isLike: false,
        postOrCommentId: postOrCommentId,
        publishingType: publishingType,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  return query;
};

export const deleteLikeOrDisLike = async (
  userId: number,
  postOrCommentId: number,
  publishingType: PublishingType,
) => {
  const findLikeId = await prisma.likeDislikes.findMany({
    where: {
      userId: userId,
      postOrCommentId: postOrCommentId,
      publishingType: publishingType,
    },
    select: {
      id: true,
    },
  });
  const idSelected = findLikeId[0];

  const query = await prisma.likeDislikes.delete({
    where: {
      id: idSelected.id,
    },
  });
  return query;
};