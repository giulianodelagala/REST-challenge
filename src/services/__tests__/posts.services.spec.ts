import { prismaMock } from '../../../singleton';
import { getAllComments } from '../comments.services';
import {
  createPost,
  deletePost,
  getOnePost,
  getPosts,
  getPostsOfUser,
  updatePost,
} from '../posts.services';

describe('Post Services', () => {
  test('should create new Post', async () => {
    const post = {
      title: 'Test Post',
      content: 'Content of test post',
      user: 1,
      isPublished: true,
    };

    await expect(createPost(1, post)).resolves.toEqual({
      id: expect.any(Number),
      title: 'Test Post',
      content: 'Content of test post',
      isPublished: true,
      userId: 1,
      dislikeCounter: null,
      likeCounter: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('should update a post', async () => {
    const query = await getPosts();
    const record = query[0];

    const post = {
      content: 'Modified content of test post',
    };

    await expect(updatePost(record.id, post)).resolves.toEqual({
      id: record.id,
      title: expect.any(String),
      content: 'Modified content of test post',
      isPublished: expect.any(Boolean),
      userId: expect.any(Number),
      dislikeCounter: record.dislikeCounter,
      likeCounter: record.likeCounter,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('should delete a post', async () => {
    const query = await getPosts();
    const record = query[0];

    await expect(deletePost(record.id)).resolves.toEqual({
      id: record.id,
      title: record.title,
      content: record.content,
      isPublished: expect.any(Boolean),
      userId: expect.any(Number),
      dislikeCounter: record.dislikeCounter,
      likeCounter: record.likeCounter,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('should get one post', async () => {
    const query = await getPosts();
    const record = query[0];

    await expect(getOnePost(record.id)).resolves.toEqual({
      id: record.id,
      title: record.title,
      content: record.content,
      isPublished: expect.any(Boolean),
      userId: expect.any(Number),
      dislikeCounter: record.dislikeCounter,
      likeCounter: record.likeCounter,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('should get a list a posts of a User', async () => {
    const posts = await getPosts();
    const query = await getPostsOfUser(posts[0].userId);

    query.forEach(element => {
      expect(element.userId).toBe(posts[0].userId);
    });
  });
});
