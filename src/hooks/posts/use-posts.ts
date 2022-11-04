import { useQuery } from '@tanstack/react-query';
import { z as zod } from 'zod';

import { handleServerError } from '~/utils';

const postSchema = zod.object({
  id: zod.string(),
  authorId: zod.string(),
  title: zod.string(),
  body: zod.string(),
  date: zod.string(),
});

export const postArraySchema = zod.array(postSchema);

type Post = zod.infer<typeof postSchema>;

export const usePosts = () =>
  useQuery(['posts'], async (): Promise<Post[] | void> => {
    try {
      const res = await fetch('/api/posts');
      const posts = await res.json();
      return postArraySchema.parse(posts);
    } catch (e) {
      return await handleServerError();
    }
  });
