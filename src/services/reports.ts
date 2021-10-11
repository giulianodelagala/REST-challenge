import { PrismaClient, PublishingType } from '@prisma/client';

interface BodyReports {
  content: string;
  isPublished?: boolean;
  userId: number;
  //publishingType: PublishingType;
}

const prisma = new PrismaClient();

export const createReportComment = async (commentId: number, body: BodyReports) => {
  console.log(body)
  const query = await prisma.reports.create({
    data: {
      content: body.content,
      isPublished: body.isPublished != null ? body.isPublished : undefined,
      user: {
        connect: {
          id: body.userId
        }
      },
      postOrCommentId: commentId,
      publishingType: 'COMMENT',
    },
  });
  return query
};

export const createReportPost = async (postId: number, body: BodyReports) => {
  console.log(body)
  
  const query = await prisma.reports.create({
    data: {
      content: body.content,
      isPublished: body.isPublished != null ? body.isPublished : undefined,
      user: {
        connect: {
          id: body.userId
        }
      },
      postOrCommentId: postId,
      publishingType: 'POST',
    },
  });
  return query
};

export const deleteReport = async (reportId: number) => {
  const query = await prisma.reports.delete({
    where: {
      id: reportId,
    },
  });
  return query
};