import { useQuery } from '@tanstack/react-query';

import { Post, postArraySchema } from '~/posts';
import { handleServerError } from '~/utils';

export const useUserPosts = (id: number | undefined) =>
  useQuery({
    queryKey: ['posts', id],
    queryFn: async (): Promise<Post[] | void> => {
      if (!id) return;
      try {
        const res = await fetch(`/api/users/${id}/posts`);
        const profileUserPosts: Post[] = await res.json();
        return postArraySchema.parse(profileUserPosts);
      } catch (e) {
        return await handleServerError(e as Error);
      }
    },
  });
