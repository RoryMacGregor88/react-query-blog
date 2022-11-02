import { FC, Fragment, ReactElement } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PostPreview } from '~/components';
import { Post } from '~/type-constants';
import { handleServerError } from '~/utils';

const PostsList: FC = (): ReactElement => {
  const {
    isLoading,
    error,
    data: posts,
    isFetching,
  } = useQuery(['posts'], async () => {
    try {
      const res = await fetch('/api/posts');
      return await res.json();
    } catch (e) {
      await handleServerError(e as Error);
    }
  });

  if (isLoading || isFetching) {
    // handle loading later
    return <h1>Loading...</h1>;
  }

  if (error) {
    // handle error later
    return <h1>ERROR!</h1>;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      {posts.map((post: Post) => (
        <Fragment key={post.id}>
          <PostPreview post={post} />
        </Fragment>
      ))}
    </div>
  );
};

export default PostsList;
