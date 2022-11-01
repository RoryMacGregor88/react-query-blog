import { Post } from '~/type-constants';

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const blogPosts = [
  {
    id: 1,
    author: 1,
    title: 'Blog Title 1',
    date: 'today',
    body,
  },
  {
    id: 2,
    author: 2,
    title: 'Blog Title 2',
    date: 'today',
    body,
  },
  {
    id: 3,
    author: 3,
    title: 'Blog Title 3',
    date: 'today',
    body,
  },
];

export const getBlogPosts = (): Post[] => blogPosts;
