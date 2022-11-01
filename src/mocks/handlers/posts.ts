import { rest } from 'msw';

import { getBlogPosts } from '~/mocks/fixtures/blog-posts';

const getPosts = rest.get('*/api/posts', (req, res, ctx) => res(ctx.status(200), ctx.json(getBlogPosts())));

const handlers = [getPosts];

export default handlers;
