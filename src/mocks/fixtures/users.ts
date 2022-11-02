import { User } from '~/type-constants';

const users = [
  {
    id: '1',
    username: 'Lister',
    email: 'test@email.com',
  },
  {
    id: '2',
    username: 'Rimmer',
    email: 'test@email.com',
  },
  {
    id: '3',
    username: 'Cat',
    email: 'test@email.com',
  },
  {
    id: '4',
    username: 'Kryten',
    email: 'test@email.com',
  },
];

export const getUserData = (): User[] => users;
