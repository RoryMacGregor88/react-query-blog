import { FC, Fragment, ReactElement } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PostPreview } from '~/components';
import { Post } from '~/type-constants';

const PostsView: FC = (): ReactElement => {
  const {
    isLoading,
    error,
    data: posts,
    isFetching,
  } = useQuery(['posts'], async () => {
    const res = await fetch('/api/posts');
    return await res.json();
  });

  if (isLoading || isFetching) {
    // handle loading later
    return <h1>Loading...</h1>;
  }

  if (error) {
    // handle error later
    return <h1>ERROR!</h1>;
  }

  return posts.map((post: Post) => (
    <Fragment key={post.id}>
      <PostPreview post={post} />
    </Fragment>
  ));
};

export default PostsView;
