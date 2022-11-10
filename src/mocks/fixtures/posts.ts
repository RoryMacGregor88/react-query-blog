import { format } from 'date-fns';

import { DATE_FORMAT } from '~/constants';
import { Post } from '~/hooks';

const body =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  date = format(new Date(), DATE_FORMAT),
  getAuthorId = () => [2, 3, 4][Math.floor(Math.random() * 3)];

let posts: Post[] = [
  {
    id: 1,
    authorId: getAuthorId(),
    title: 'Test title 1',
    date,
    body,
  },
  {
    id: 2,
    authorId: 1,
    title: 'Test title 2',
    date,
    body,
  },
  {
    id: 3,
    authorId: getAuthorId(),
    title: 'Test title 3',
    date,
    body,
  },
  {
    id: 4,
    authorId: getAuthorId(),
    title: 'Test title 4',
    date,
    body,
  },
  {
    id: 5,
    authorId: 1,
    title: 'Test title 5',
    date,
    body,
  },
  {
    id: 6,
    authorId: getAuthorId(),
    title: 'Test title 6',
    date,
    body,
  },
  {
    id: 7,
    authorId: 1,
    title: 'Test title 7',
    date,
    body,
  },
  {
    id: 8,
    authorId: getAuthorId(),
    title: 'Test title 8',
    date,
    body,
  },
  {
    id: 9,
    authorId: getAuthorId(),
    title: 'Test title 9',
    date,
    body,
  },
  {
    id: 10,
    authorId: getAuthorId(),
    title: 'Test title 10',
    date,
    body,
  },
];

const getMockPosts = (): Post[] => posts;

const createMockPost = (newPost: Post): Post[] => {
  posts = [...posts, newPost];
  return posts;
};

const updateMockPost = (post: Post, id: number): Post[] => {
  posts = [...posts.filter((post: Post) => post.id !== id), post];
  return posts;
};

const deleteMockPost = (id: number): Post[] => {
  posts = posts.filter((post: Post) => post.id !== id);
  return posts;
};

export { getMockPosts, createMockPost, updateMockPost, deleteMockPost };
