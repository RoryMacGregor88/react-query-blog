import { Post } from '~/type-constants';

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const test = new Array(30).fill(undefined).map((_, i) => {
  const id = i.toString(),
    authorId = Math.floor(Math.random() * 4) + 1;
  return {
    id,
    authorId: authorId.toString(),
    title: `Post Title ${id}`,
    // make random dates
    date: '15:34',
    body,
  };
});

export const getPostData = (): Post[] => test;
