import { FC, ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { PostPreview } from '~/components';
import { Post, User, useUserAndPosts } from '~/hooks';

type Props = {
  currentUser: User | null;
};

const UserProfile: FC<Props> = ({ currentUser }): ReactElement | null => {
  const { id } = useParams();

  const isCurrentUser = id === currentUser?.id;

  const { areLoading, areFetching, user, userPosts, errors } = useUserAndPosts(id);

  console.log('userPosts: ', userPosts);

  if (areLoading || areFetching) {
    return <div>Please wait...</div>;
  }

  if (errors.userError || errors.postsError) {
    console.log('Error: ', errors);
    return <h1>ERROR!</h1>;
  }

  return !user || !userPosts ? null : (
    <div>
      <p>Viewing profile for {isCurrentUser ? 'yourself' : user.username}.</p>
      <p>
        {isCurrentUser ? 'You have' : `${user.username} has`} made {userPosts.length} post
        {userPosts.length === 1 ? '' : 's'}:
      </p>
      {userPosts.map((post: Post) => (
        <PostPreview key={post.id} isAuthor={true} post={post} />
      ))}
    </div>
  );
};

export default UserProfile;
