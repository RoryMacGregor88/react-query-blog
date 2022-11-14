import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Post } from '~/posts';
import { handleServerError } from '~/utils';

export const useCreatePost = (redirect?: string | null) => {
  const QC = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (post: Post): Promise<Post[] | void> => {
      try {
        await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post)
        });
      } catch (e) {
        return await handleServerError(e as Error);
      }
    },
    onSuccess: () => {
      QC.invalidateQueries(['posts']);
      if (redirect) navigate(redirect);
    },
  });
};
