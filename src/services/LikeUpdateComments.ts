import { PrismaClient, PublishingType } from '@prisma/client';

const prisma = new PrismaClient();

export const LikeUpdateComments = async (idComment: number) => {
  const findIdComment = await prisma.comments.findUnique({
    where: {
      id: idComment,
    },
    select: {
      likeCounter: true,
      dislikeCounter: true,
    },
  });

  const selectLikeCounter = Number(findIdComment?.likeCounter) + 1;
  const selectDislikeCounter = Number(findIdComment?.likeCounter) - 1;

  const updateComment = await prisma.comments.update({
    where: {
      id: idComment,
    },
    data: {
      likeCounter: selectLikeCounter,
      dislikeCounter: selectDislikeCounter,
    },
  });
  console.log(updateComment);
};

export const LikeUpdatePosts = async (idComment: number) => {
  const findIdComment = await prisma.comments.findUnique({
    where: {
      id: idComment,
    },
    select: {
      likeCounter: true,
      dislikeCounter: true,
    },
  });

  const selectLikeCounter = Number(findIdComment?.likeCounter) - 1;
  const selectDislikeCounter = Number(findIdComment?.likeCounter) + 1;

  const updateComment = await prisma.comments.update({
    where: {
      id: idComment,
    },
    data: {
      likeCounter: selectLikeCounter,
      dislikeCounter: selectDislikeCounter,
    },
  });
  console.log(updateComment);
};
