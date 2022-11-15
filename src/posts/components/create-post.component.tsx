import { FC, ReactElement, useEffect } from 'react';

import { useCreatePost, PostForm } from '~/posts';
import { User } from '~/users';

import { SetWellData } from '~/types';

import { DEFAULT_ERROR_MESSAGE } from '~/constants'

interface Props {
  currentUser: User | null;
  setWellData: SetWellData;
};

const CreatePost: FC<Props> = ({ currentUser, setWellData }): ReactElement => {
  const { error, isSuccess, mutateAsync: createPost } = useCreatePost('/posts');

  useEffect(() => {
    if (error) {
      setWellData({ isError: true, message: DEFAULT_ERROR_MESSAGE });
    } else if (isSuccess) {
      setWellData({ isError: false, message: 'Successfully created post.' });
    }
  }, [isSuccess, error, setWellData]);

  return (
    <PostForm currentUser={currentUser} submitPost={createPost} />
  )
};

export default CreatePost;
