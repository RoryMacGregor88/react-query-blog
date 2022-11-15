import { FC, ReactElement, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { User } from '~/users';
import { usePost } from '~/posts';

import { AuthorTag } from '~/components'
import { DEFAULT_ERROR_MESSAGE } from '~/constants';
import { SetWellData } from '~/types'

interface Props {
  currentUser: User | null;
  setWellData: SetWellData;
}

const FullPost: FC<Props> = ({ currentUser, setWellData }): ReactElement | null => {
  const { id } = useParams();

  const { error, isSuccess, data: post } = usePost(Number(id));

  useEffect(() => {
    if (error) {
      setWellData({ isError: true, message: DEFAULT_ERROR_MESSAGE });
    } else if (isSuccess) {
      setWellData({ isError: false, message: 'Successfully updated post.' });
    }
  }, [error, isSuccess, setWellData]);

  if (!post) return null;

  const isAuthor = currentUser?.id === post?.authorId;

  return (
    <div className='flex flex-col w-1/2 gap-4'>
      <h3 className='font-bold text-lg'>{post.title} {isAuthor ? <AuthorTag /> : null}</h3>
      <p>{post.body}</p>
      <p>{`Created by ${post.authorId}: ${post.date}`}</p>
    </div>
  );
};

export default FullPost;
