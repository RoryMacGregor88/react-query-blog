import { useQuery } from '@tanstack/react-query';
import { z as zod } from 'zod';

import { Post, postSchema } from '~/hooks';
import { handleServerError } from '~/utils';

export const postArraySchema = zod.array(postSchema);

export const usePosts = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[] | void> => {
      try {
        const res = await fetch('/api/posts');
        const posts: Post[] = await res.json();
        return postArraySchema.parse(posts);
      } catch (e) {
        return await handleServerError();
      }
    },
  });
