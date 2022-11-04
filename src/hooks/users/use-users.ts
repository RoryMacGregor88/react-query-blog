import { useQuery } from '@tanstack/react-query';
import { z as zod } from 'zod';

import { handleServerError } from '~/utils';

const userSchema = zod.object({
  id: zod.string(),
  username: zod.string(),
  email: zod.string().email(),
});

export const userArraySchema = zod.array(userSchema);

type User = zod.infer<typeof userSchema>;

export const useUsers = () =>
  useQuery(['users'], async (): Promise<User[] | void> => {
    try {
      const res = await fetch('/api/users');
      const users: User[] = await res.json();
      return userArraySchema.parse(users);
    } catch (e) {
      return await handleServerError();
    }
  });
