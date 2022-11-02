import { FC, ReactElement } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Post, User } from '~/type-constants';
import { handleServerError } from '~/utils';

type Props = {
  currentUser: User | undefined;
};

const FullPost: FC<Props> = ({ currentUser }): ReactElement | null => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data: post,
    isFetching,
  } = useQuery(['posts'], async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      const post: Post = await res.json();
      return post;
    } catch (e) {
      await handleServerError(e as Error);
    }
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h1>ERROR!</h1>;
  }

  return !post ? null : (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{`Created by ${post.authorId}: ${post.date}`}</p>
    </div>
  );
};

export default FullPost;
