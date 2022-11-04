import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Post, postArraySchema } from '~/hooks';
import { handleServerError } from '~/utils';

export const useUpdatePost = (redirect: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (post: Post): Promise<Post[] | void> => {
      try {
        const res = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const updatedPosts: Post[] = await res.json();
        return postArraySchema.parse(updatedPosts);
      } catch (e) {
        return await handleServerError();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      if (redirect) navigate(redirect);
    },
  });
};
