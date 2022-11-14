import { FC, ReactElement, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import { PostForm, usePost, useUpdatePost } from '~/posts';
import { User } from '~/users';

import { Button } from '~/components'

import { SetWellData } from '~/types';
import { DEFAULT_ERROR_MESSAGE } from '~/constants';

interface Props {
  currentUser: User | null;
  setWellData: SetWellData;
};

const EditPost: FC<Props> = ({ currentUser, setWellData }): ReactElement | null => {
  const { id } = useParams();

  const { error: getError, data: post } = usePost(Number(id));
  const { error: updateError, isSuccess, mutateAsync: updatePost } = useUpdatePost('/posts')

  useEffect(() => {
    if (getError || updateError) {
      setWellData({ isError: true, message: DEFAULT_ERROR_MESSAGE });
    } else if (isSuccess) {
      setWellData({ isError: false, message: 'Successfully updated post.' });
    }
  }, [getError, updateError, isSuccess]);

  if (!post) return null;

  return post.authorId !== currentUser?.id ? (
    <div>
      <h4>You are not allowed to edit this post.</h4>
      <Link to={'/posts'}>
        <Button>
          <span>Go back</span>
        </Button>
      </Link>
    </div>
  ) : (
    <PostForm currentUser={currentUser} submitPost={updatePost} postToEdit={post} />
  );
};

export default EditPost;
