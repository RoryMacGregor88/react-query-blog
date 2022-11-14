import { FC, ReactElement } from 'react';

import { SetWellData } from '~/types';
import { User } from '~/users';
import { usePosts, PostsList } from '~/posts';

interface Props {
  currentUser: User | null;
  filterByCurrentUser?: boolean;
  setWellData: SetWellData
};

const Posts: FC<Props> = ({ currentUser, filterByCurrentUser = false, setWellData }): ReactElement | null => {
  const { data } = usePosts();

  if (!data) return null;

  const posts = currentUser && filterByCurrentUser 
    ? data.filter(post => post.authorId === currentUser.id) 
    : data;
  
  return (
    <PostsList currentUser={currentUser} posts={posts} setWellData={setWellData} />
  )
}

export default Posts;