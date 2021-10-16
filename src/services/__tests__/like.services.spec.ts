import { prismaMock } from '../../../singleton';

import { deleteLikeOrDisLike, setDislike, setLike } from '../like.services';

const info = {
  createdAt: expect.any(Date),
  id: expect.any(Number),
  isLike: expect.any(Boolean),
  postOrCommentId: expect.any(Number),
  publishingType: expect.any(String),
  userId: expect.any(Number),
};

describe('Likes Services', () => {
  test('should set Like to a comment', async () => {
    await expect(setLike(1, 1, 'COMMENT')).resolves.toEqual({
      ...info,
      isLike: true,
      postOrCommentId: 1,
      publishingType: 'COMMENT',
      userId: 1,
    });
  });

  test('should change like to dislike to a post', async () => {
    await expect(setDislike(1, 1, 'COMMENT')).resolves.toEqual({
      ...info,
      isLike: false,
      postOrCommentId: 1,
      publishingType: 'COMMENT',
      userId: 1,
    });
  });

  test('should set dislike to a post', async () => {
    await expect(setDislike(1, 1, 'POST')).resolves.toEqual({
      ...info,
      isLike: false,
      postOrCommentId: 1,
      publishingType: 'POST',
      userId: 1,
    });
  });

  test('should change dislike to like to a post', async () => {
    await expect(setLike(1, 1, 'POST')).resolves.toEqual({
      ...info,
      isLike: true,
      postOrCommentId: 1,
      publishingType: 'POST',
      userId: 1,
    });
  });

  test('should delete dislike to a post', async () => {
    await expect(deleteLikeOrDisLike(1, 1, 'POST')).resolves.toEqual({
      ...info,
      postOrCommentId: 1,
      publishingType: 'POST',
      userId: 1,
    });
  });
});
