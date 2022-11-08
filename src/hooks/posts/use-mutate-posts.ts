import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Post, postArraySchema } from '~/hooks';
import { handleServerError } from '~/utils';

export const useMutatePosts = (redirect?: string, method = 'POST') => {
  const QC = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (post?: Post): Promise<Post[] | void> => {
      const options = post ? { post: JSON.stringify(post) } : {};
      try {
        const res = await fetch('/api/posts', {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          ...options,
        });
        const updatedPosts: Post[] = await res.json();
        return postArraySchema.parse(updatedPosts);
      } catch (e) {
        return await handleServerError();
      }
    },
    onSuccess: () => {
      QC.invalidateQueries(['posts']);
      if (redirect) navigate(redirect);
    },
  });
};
