import { useQuery } from '@tanstack/react-query';
import { z as zod } from 'zod';

import { User, userSchema } from '~/hooks';
import { handleServerError } from '~/utils';

export const userArraySchema = zod.array(userSchema);

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[] | void> => {
      try {
        const res = await fetch('/api/users');
        const users: User[] = await res.json();
        return userArraySchema.parse(users);
      } catch (e) {
        return await handleServerError();
      }
    },
  });
