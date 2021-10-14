import { PrismaClient, PublishingType } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';
import { threadId } from 'worker_threads';

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
  console.log(idSelected);
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
    console.log('no creado, lo creamos');
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

  // if (query && idSelected.isLike == null) {
  //   if (publishingType == 'COMMENT') {
  //     const result: number = await prisma.$executeRawUnsafe(`UPDATE "Comments" 
  //       SET like_counter = like_counter + 1
  //       WHERE id = ${postOrCommentId};`);
  //     console.log(result);
  //   }
  //   if (publishingType == 'POST') {
  //     const result: number = await prisma.$executeRaw`UPDATE Pots 
  //       SET like_counter = like_counter - 1 
  //       WHERE id = ${postOrCommentId};`;
  //     console.log(result);
  //   }
  // }
  return query;
};

export const setDislike = async (
  userId: number,
  postOrCommentId: number,
  publishingType: PublishingType,
) => {
  console.log(userId, postOrCommentId, publishingType);
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
  console.log(idSelected);
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
    console.log('no creado');
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