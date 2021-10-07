import {PrismaClient, PublishingType} from '@prisma/client';

const prisma = new PrismaClient();

export const createReport = async (
  content: string,
  is_published: boolean,
  user_id: number,
  post_comment_id: number,
  publishing_type: PublishingType,
) => {
  const query = await prisma.reports.create({
    data: {
      content: content,
      isPublished: is_published,
      userId: user_id,
      postOrCommentId: post_comment_id,
      publishingType: publishing_type,
    },
  });
  console.log(query);
};
