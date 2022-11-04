import { UseQueryResult, useQueries } from '@tanstack/react-query';

import { Post, User, postArraySchema, userSchema } from '~/hooks';
import { handleServerError } from '~/utils';

type Queries = [UseQueryResult<User | void>, UseQueryResult<Post[] | void>];

export const useUserAndPosts = (id: string | undefined) => {
  const [userRes, postsRes]: Queries = useQueries({
    queries: [
      {
        queryKey: ['user', id],
        queryFn: async (): Promise<User | void> => {
          try {
            const res = await fetch(`/api/users/${id}`);
            const profileUser: User = await res.json();
            return userSchema.parse(profileUser);
          } catch (e) {
            return await handleServerError();
          }
        },
      },
      {
        queryKey: ['posts', id],
        queryFn: async (): Promise<Post[] | void> => {
          try {
            const res = await fetch(`/api/users/${id}/posts`);
            const profileUserPosts: Post[] = await res.json();
            return postArraySchema.parse(profileUserPosts);
          } catch (e) {
            return await handleServerError();
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
