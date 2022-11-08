import { FC, ReactElement } from 'react';

import { LoadingScreen, PostPreview } from '~/components';
import { Post, User, usePosts } from '~/hooks';

type Props = {
  currentUser: User | null;
};

const PostsList: FC<Props> = ({ currentUser }): ReactElement | null => {
  const { error, data: posts, isLoading, isFetching } = usePosts();

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>ERROR!</h1>;
  }

  return !posts ? null : (
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
      {posts.map((post: Post) => {
        const isAuthor = currentUser?.id === post.authorId;
        return (
          <div
            key={post.id}
            style={{
              padding: '1rem',
              width: '100%',
            }}
          >
            <PostPreview isAuthor={isAuthor} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
