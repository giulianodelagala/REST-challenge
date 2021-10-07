import { PublishingType } from '.prisma/client';

interface Comments {
  id: number;
  content: string;
  isPublished: boolean;
  likeCounter: number;
  dislikeCounter: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  postId: number;
}

export type createComments = Omit<
  Comments,
  | 'id'
  | 'isPublished'
  | 'likeCounter'
  | 'dislikeCounter'
  | 'createdAt'
  | 'updatedAt'
>;

export type updateComments = Omit<
  Comments,
  | 'isPublished'
  | 'likeCounter'
  | 'dislikeCounter'
  | 'createdAt'
  | 'updatedAt'
  | 'userId'
  | 'postId'
>;

interface Reports {
  id: number;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  postOrCommentId: number;
  publishingType: PublishingType;
}

export type createReports = Omit<
  Reports,
  'id' | 'isPublished' | 'createdAt' | 'updatedAt'
>;

interface Like {
  id: number;
  isLike: boolean;
  createdAt: Date;
  userId: number;
  postOrCommentId: number;
  publishingType: PublishingType;
}

export type createLikeComment = Omit<Like, 'id' | 'createdAt'>;
export type toggleLikeComment = Omit<Like, 'createdAt' >;
