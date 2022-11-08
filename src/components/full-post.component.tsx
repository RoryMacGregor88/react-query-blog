import { FC, ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { LoadingScreen } from '~/components';
import { User, usePost } from '~/hooks';

type Props = {
  currentUser: User | null;
};

const FullPost: FC<Props> = ({ currentUser }): ReactElement | null => {
  const { id } = useParams();

  const { error, data: post, isLoading, isFetching } = usePost(id);

  if (isLoading || isFetching) {
    return <LoadingScreen />;
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
