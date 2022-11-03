import { rest } from 'msw';

import { getPostData } from '~/mocks/fixtures/posts';

const getPosts = rest.get('*/api/posts', (req, res, ctx) => res(ctx.status(200), ctx.json(getPostData())));

const getPost = rest.get('*/api/posts/:id', (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getPostData().find(b => b.id === req.params.id))),
);

// silly name, do better
const postPost = rest.post('*/api/posts', (req, res, ctx) => {
  const newPost = req.json();
  return res(ctx.status(200), ctx.json([...getPostData(), newPost]));
});

const handlers = [getPosts, getPost, postPost];

export default handlers;
