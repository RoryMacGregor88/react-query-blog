import { FC, ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { PostPreview } from '~/components';
import { Post, User, useUserPosts } from '~/hooks';

type Props = {
  currentUser: User | null;
};

const UserProfile: FC<Props> = ({ currentUser }): ReactElement | null => {
  const { id } = useParams();

  const isCurrentUser = id === currentUser?.id;

  const { data: userPosts } = useUserPosts(Number(id));

  return !userPosts ? null : (
    <div>
      {isCurrentUser ? <h1>You created this post.</h1> : null}
      {userPosts.map((post: Post) => (
        <PostPreview key={post.id} isAuthor={true} post={post} />
      ))}
    </div>
  );
};

export default UserProfile;
