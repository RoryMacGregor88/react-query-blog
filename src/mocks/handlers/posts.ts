import { rest } from 'msw';

import { Post } from '~/posts';
import { createMockPost, deleteMockPost, getMockPosts, updateMockPost } from '~/mocks/fixtures/posts';

const getPosts = rest.get('*/api/posts', (req, res, ctx) => res(ctx.status(200), ctx.json(getMockPosts())));

const getPost = rest.get('*/api/posts/:id', (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getMockPosts().find(b => b.id === Number(req.params.id)))),
);

const createPost = rest.post('*/api/posts', async (req, res, ctx) => {
  const newPost: Post = await req.json();
  return res(ctx.status(200), ctx.json(createMockPost(newPost)));
});

const updatePost = rest.post('*/api/posts/:id', async (req, res, ctx) => {
  const post: Post = await req.json();
  return res(ctx.status(200), ctx.json(updateMockPost(post, Number(req.params.id))));
});

const deletePost = rest.delete('*/api/posts/:id', async (req, res, ctx) =>
  res(ctx.status(200), ctx.json(deleteMockPost(Number(req.params.id)))),
);

const handlers = [getPosts, getPost, createPost, updatePost, deletePost];

export default handlers;
