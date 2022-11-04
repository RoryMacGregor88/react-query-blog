import { useQuery } from '@tanstack/react-query';
import { z as zod } from 'zod';

import { handleServerError } from '~/utils';

export const userSchema = zod.object({
  id: zod.string(),
  username: zod.string(),
  email: zod.string().email(),
});

export type User = zod.infer<typeof userSchema>;

export const useUser = (id: string | undefined) =>
  useQuery(['users'], async (): Promise<User | void> => {
    try {
      const res = await fetch(`/api/users/${id}`);
      const user = await res.json();
      return userSchema.parse(user);
    } catch (e) {
      return await handleServerError();
    }
  });
