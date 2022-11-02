import { Post } from '~/type-constants';

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const posts = [
  {
    id: '1',
    authorId: '1',
    title: 'Post Title 1',
    date: '15:34',
    body,
  },
  {
    id: '2',
    authorId: '2',
    title: 'Post Title 2',
    date: '11:12',
    body,
  },
  {
    id: '3',
    authorId: '3',
    title: 'Post Title 3',
    date: '19:40',
    body,
  },
  {
    id: '4',
    authorId: '4',
    title: 'Post Title 4',
    date: '13:32',
    body,
  },
  {
    id: '5',
    authorId: '5',
    title: 'Post Title 5',
    date: '09:01',
    body,
  },
];

export const getPostData = (): Post[] => posts;
