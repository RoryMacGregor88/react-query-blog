import { FC, ReactElement } from 'react';

import { UseQueryResult, useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Post, User } from '~/type-constants';
import { handleServerError } from '~/utils';

type Props = {
  currentUser: User | undefined;
};

const UserProfile: FC<Props> = ({ currentUser }): ReactElement | null => {
  const { id } = useParams();

  const isCurrentUser = id === currentUser?.id;

  type Queries = [UseQueryResult<User | undefined, unknown>, UseQueryResult<Post[] | undefined, unknown>];

  const [userRes, postsRes]: Queries = useQueries({
    queries: [
      {
        queryKey: ['user', id],
        queryFn: async () => {
          try {
            const res = await fetch(`/api/users/${id}`);
            const profileUser: User = await res.json();
            return profileUser;
          } catch (e) {
            await handleServerError(e as Error);
          }
        },
      },
      {
        queryKey: ['posts', id],
        queryFn: async () => {
          try {
            const res = await fetch(`/api/users/${id}/posts`);
            const profileUserPosts: Post[] = await res.json();
            return profileUserPosts;
          } catch (e) {
            await handleServerError(e as Error);
          }
        },
      },
    ],
  });

  const { data: user, isLoading: userLoading, error: userError } = userRes;

  const { data: userPosts, isLoading: postsLoading, error: postsError } = postsRes;

  if (userLoading || postsLoading) {
    return <div>Loading...</div>;
  }

  if (userError || postsError) {
    return <h1>ERROR!</h1>;
  }

  return !user || !userPosts ? null : (
    <div>
      <p>Viewing profile for {isCurrentUser ? 'yourself' : user.username}.</p>
      <p>
        {isCurrentUser ? 'You have' : `${user.username} has`} made {userPosts.length} post
        {userPosts.length < 2 ? '' : 's'}:
      </p>
      {userPosts.map(({ id, title, date }) => (
        <div key={id}>
          <h4>Title: {title}</h4>
          <p>Created: {date}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
