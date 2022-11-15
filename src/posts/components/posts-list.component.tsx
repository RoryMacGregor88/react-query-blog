import { FC, ReactElement, useEffect } from 'react';

import { PostPreview } from '~/posts';
import { SetWellData } from '~/types';
import { User } from '~/users';
import { Post, useDeletePost } from '~/posts';
import { DEFAULT_ERROR_MESSAGE } from '~/constants';

interface Props {
  posts: Post[];
  currentUser: User | null;
  setWellData: SetWellData;
}

const PostsList: FC<Props> = ({ currentUser, posts, setWellData }): ReactElement => {

  const { error, isSuccess, mutateAsync: deletePost } = useDeletePost()

  useEffect(() => {
    if (error) {
      setWellData({ isError: true, message: DEFAULT_ERROR_MESSAGE })
    } else if (isSuccess) {
      setWellData({ isError: false, message: 'Post successfully deleted.' })
    }
  }, [error, isSuccess, setWellData]);

  const handleDelete = (post: Post) => {
    deletePost(post)
  }

  return (
    <div className='flex-column gap-4 w-full'>
      {posts.map((post: Post) => {
        const isAuthor = currentUser?.id === post.authorId;
        return (
          <div
            key={post.id}
            className='p-4 w-full'
          >
            <PostPreview isAuthor={isAuthor} post={post} setWellData={setWellData} handleDelete={handleDelete} />
          </div>
        );
    })}
    </div>
  )
}

export default PostsList;
