import { useQuery } from '@tanstack/react-query';
import { z as zod } from 'zod';

import { handleServerError } from '~/utils';

export const postSchema = zod.object({
  id: zod.string(),
  authorId: zod.string(),
  title: zod.string(),
  body: zod.string(),
  date: zod.string(),
});

export type Post = zod.infer<typeof postSchema>;

export const usePost = (id: string | undefined) =>
  useQuery({
    queryKey: ['post', id],
    queryFn: async (): Promise<Post | void> => {
      try {
        if (!id) return;
        const res = await fetch(`/api/posts/${id}`);
        const post: Post = await res.json();
        return postSchema.parse(post);
      } catch (e) {
        return await handleServerError();
      }
    },
  });
