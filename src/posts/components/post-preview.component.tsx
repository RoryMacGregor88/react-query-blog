import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { useUser } from '~/users';
import { Post } from '~/posts';

import { AuthorTag, Button } from '~/components'

interface Props {
  post: Post;
  isAuthor: boolean;
  handleDelete: (post: Post) => void;
};

const PostPreview: FC<Props> = ({ post, isAuthor, handleDelete }): ReactElement | null => {
  const { id, authorId, title, date } = post;

  const { data: author } = useUser(authorId);

  if (!author) return null;

  return (
    <div style={{ display: 'flex', padding: '1rem', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <h2>{title} {isAuthor ? <AuthorTag /> : null}</h2>
      {isAuthor ? (
        <p>
        You created this post on {date}
        </p>
      ) : (
        <p>
        Created by {author.username} on {date}
        </p>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Link to={`/posts/${id}`}>
          <Button>
            View Full Post
          </Button>
        </Link>
        {isAuthor ? (
          <>
            <Link to={`/posts/${id}/edit`}>
            <Button>
              Edit Post
            </Button>
          </Link>
            <Button onClick={() => handleDelete(post)}>
              Delete
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PostPreview;
