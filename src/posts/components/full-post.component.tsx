import { FC, ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { User } from '~/users';
import { usePost } from '~/posts';

import { AuthorTag } from '~/components'

interface Props {
  currentUser: User | null;
};

const FullPost: FC<Props> = ({ currentUser }): ReactElement | null => {
  const { id } = useParams();

  const { data: post } = usePost(Number(id));

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
