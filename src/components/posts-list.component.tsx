import { FC, ReactElement } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PostPreview } from '~/components';
import { Post, User } from '~/type-constants';
import { handleServerError } from '~/utils';

type Props = {
  currentUser: User | undefined;
};

const PostsList: FC<Props> = ({ currentUser }): ReactElement | null => {
  const {
    isLoading,
    error,
    data: posts,
    isFetching,
  } = useQuery(['posts'], async (): Promise<Post[] | void> => {
    try {
      const res = await fetch('/api/posts');
      const posts: Post[] = await res.json();
      return posts;
    } catch (e) {
      await handleServerError(e as Error);
    }
  });

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>ERROR!</h1>;
  }

  if (!posts) {
    return null;
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
      {posts.map((post: Post) => {
        const isAuthor = currentUser?.id === post.authorId,
          authorStyles = isAuthor
            ? {
                borderRadius: '3px',
                border: '2px solid red',
              }
            : {};
        return (
          <div
            key={post.id}
            style={{
              padding: '1rem',
              width: '100%',
              ...authorStyles,
            }}
          >
            {isAuthor ? (
              <p
                style={{
                  width: 'fit-content',
                  marginBottom: '0.5rem',
                }}
              >
                You created this post
              </p>
            ) : null}
            <PostPreview post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
