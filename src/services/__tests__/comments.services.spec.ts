import { prismaMock } from '../../../singleton';
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  getCommentsOfPost,
  getOneCommentOfPost,
  updateComment,
} from '../comments.services';

const info = {
  content: expect.any(String),
  createdAt: expect.any(Date),
  dislikeCounter: expect.any(Number),
  id: expect.any(Number),
  isPublished: expect.any(Boolean),
  likeCounter: expect.any(Number),
  postId: expect.any(Number),
  updatedAt: expect.any(Date),
  userId: 1,
};

describe('Comments Services', () => {
  test('should create new Comment', async () => {
    const post = {
      content: 'Content of test comment',
      isPublished: true,
    };

    await expect(createComment(1, 1, post)).resolves.toEqual({
      ...info,
      content: 'Content of test comment',
      isPublished: true,
    });
  });

  test('should get a list of comments', async () => {
    await expect(getAllComments()).resolves.toBeInstanceOf(Array);
  });

  test('should get a list of comments of a post', async () => {
    const comments = await getAllComments();
    const query = await getCommentsOfPost(comments[0].postId);

    query.forEach(element => {
      expect(element.postId).toBe(comments[0].postId)
    });
  });

  test('should get a comment of a post', async () => {
    const comments = await getAllComments();
    const query = await getOneCommentOfPost(comments[0].postId, comments[0].id);

    expect(query[0].postId).toBe(comments[0].postId);

  });

  test('should update a comment', async () => {
    const query = await getAllComments();
    const record = query[0];

    const update = {
      content: 'Modified content of test comment',
    };

    await expect(updateComment(record.id, update)).resolves.toEqual({
      ...info,
      content: 'Modified content of test comment',
    });
  });

  test('should get a comment', async () => {
    const query = await getAllComments();
    const record = query[0];

    await expect(getComment(record.id)).resolves.toEqual({
      ...info,
      id: record.id,
    });
  });

  test('should delete a comment', async () => {
    const query = await getAllComments();
    const record = query[0];

    await expect(deleteComment(record.id)).resolves.toEqual({
      ...info,
    });
  });
});
