import { rest } from 'msw';

import { getMockPosts } from '~/mocks/fixtures/posts';
import { getMockUsers } from '~/mocks/fixtures/users';

const getUsers = rest.get('*/api/users', (req, res, ctx) => res(ctx.status(200), ctx.json(getMockUsers())));

const getUser = rest.get('*/api/users/:id', (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getMockUsers().find(u => u.id === +req.params.id))),
);

const getUserPosts = rest.get('*/api/users/:id/posts', (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getMockPosts().filter(p => p.authorId === +req.params.id))),
);

const handlers = [getUsers, getUser, getUserPosts];

export default handlers;
