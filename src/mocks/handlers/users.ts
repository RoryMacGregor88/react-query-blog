import { rest } from 'msw';

import { getPostData } from '~/mocks/fixtures/posts';
import { getUserData } from '~/mocks/fixtures/users';

const getUsers = rest.get('*/api/users', (req, res, ctx) => res(ctx.status(200), ctx.json(getUserData())));

const getUser = rest.get('*/api/users/:id', (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getUserData().find(u => u.id === req.params.id))),
);

const getUserPosts = rest.get('*/api/users/:id/posts', (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getPostData().filter(p => p.authorId === req.params.id))),
);

const handlers = [getUsers, getUser, getUserPosts];

export default handlers;
