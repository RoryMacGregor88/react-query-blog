import { FC, ReactElement, useEffect } from 'react';

import { SetWellData } from '~/types';
import { User } from '~/users';
import { usePosts, PostsList } from '~/posts';
import { DEFAULT_ERROR_MESSAGE } from '~/constants';

interface Props {
  currentUser: User | null;
  filterByCurrentUser?: boolean;
  setWellData: SetWellData
};

const Posts: FC<Props> = ({ currentUser, filterByCurrentUser = false, setWellData }): ReactElement | null => {
  const { error, isSuccess, data } = usePosts();

  useEffect(() => {
    if (error) {
      setWellData({ isError: true, message: DEFAULT_ERROR_MESSAGE })
    } else if (isSuccess) {
      // TODO: some of these messages are wrong!!!
      setWellData({ isError: false, message: 'Post successfully deleted.' })
    }
  }, [error, isSuccess, setWellData]);

  if (!data) return null;

  const posts = currentUser && filterByCurrentUser
    ? data.filter(post => post.authorId === currentUser.id)
    : data;

  return (
    <PostsList currentUser={currentUser} posts={posts} setWellData={setWellData} />
  )
}

export default Posts;
