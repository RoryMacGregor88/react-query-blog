import { useQuery } from '@tanstack/react-query';
import { z as zod } from 'zod';

import { handleServerError } from '~/utils';

export const userSchema = zod.object({
  id: zod.number(),
  username: zod.string(),
  email: zod.string().email(),
});

export type User = zod.infer<typeof userSchema>;

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', +id],
    queryFn: async (): Promise<User | void> => {
      if (!id) return;
      try {
        const res = await fetch(`/api/users/${id}`);
        const user: User = await res.json();
        return userSchema.parse(user);
      } catch (e) {
        return await handleServerError(e as Error);
      }
    },
  });
};
