import { Dispatch, FC, ReactElement, SetStateAction } from 'react';

import { Link, useParams } from 'react-router-dom';

import { PostForm } from '~/components';
import { User, usePost } from '~/hooks';

type Props = {
  currentUser: User | null;
  setWellData: Dispatch<SetStateAction<{ error?: boolean; message: string } | null>>;
};

const EditPostForm: FC<Props> = ({ currentUser, setWellData }): ReactElement | null => {
  const { id } = useParams();

  const { error, data: post } = usePost(Number(id));

  if (error) {
    setWellData({ error: true, message: 'Error loading post.' });
  }

  return !post ? null : post.authorId !== currentUser?.id ? (
    <div>
      <h4>You are not allowed to edit this post.</h4>
      <Link to={'/posts'}>
        <button>
          <span>Go back</span>
        </button>
      </Link>
    </div>
  ) : (
    <PostForm currentUser={currentUser} postToEdit={post} setWellData={setWellData} />
  );
};

export default EditPostForm;