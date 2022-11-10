import { User } from '~/hooks';

const users = [
  {
    id: 1,
    username: 'User One',
    email: 'test@email.com',
  },
  {
    id: 2,
    username: 'User Two',
    email: 'test@email.com',
  },
  {
    id: 3,
    username: 'User Three',
    email: 'test@email.com',
  },
  {
    id: 4,
    username: 'User Four',
    email: 'test@email.com',
  },
];

export const getMockUsers = (): User[] => users;
