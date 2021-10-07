import { PrismaClient, PublishingType } from '@prisma/client';
import { createReports } from '../types';

const prisma = new PrismaClient();

export const createReport = async (body: createReports) => {
  const query = await prisma.reports.create({
    data: {
      content: body.content,
      userId: body.userId,
      postOrCommentId: body.postOrCommentId,
      publishingType: body.publishingType,
    },
  });
  console.log(query);
};
