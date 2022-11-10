import { UseQueryResult, useQueries } from '@tanstack/react-query';

import { Post, User, postArraySchema, userSchema } from '~/hooks';
import { handleServerError } from '~/utils';

type Queries = [UseQueryResult<User | void>, UseQueryResult<Post[] | void>];

export const useUserAndPosts = (id: number) => {
  const [userRes, postsRes]: Queries = useQueries({
    queries: [
      {
        queryKey: ['user', id],
        queryFn: async (): Promise<User | void> => {
          if (!id) return;
          try {
            const res = await fetch(`/api/users/${id}`);
            const profileUser: User = await res.json();
            return userSchema.parse(profileUser);
          } catch (e) {
            return await handleServerError(e as Error);
          }
        },
      },
      {
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
      },
    ],
  });

  const { data: user, isFetching: isUserFetching, isLoading: isUserLoading, error: userError } = userRes;

  const { data: userPosts, isFetching: arePostsFetching, isLoading: arePostsLoading, error: postsError } = postsRes;

  const errors = {
    userError: userError ?? null,
    postsError: postsError ?? null,
  };

  const areLoading = isUserLoading || arePostsLoading;
  const areFetching = isUserFetching || arePostsFetching;

  return { areFetching, areLoading, user, userPosts, errors };
};
