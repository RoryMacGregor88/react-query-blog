import { FC, ReactElement } from 'react';

import { Button } from '@astrosat/react-utils';
import { Link } from 'react-router-dom';

import { useUser } from '~/users';
import { Post } from '~/posts';

import { AuthorTag } from '~/components'

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
            <span style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}>
              View Full Post
            </span>
          </Button>
        </Link>
        {isAuthor ? (
          <>
            <Link to={`/posts/${id}/edit`}>
            <Button>
              <span style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}>
                Edit Post
              </span>
            </Button>
          </Link>
            <Button onClick={() => handleDelete(post)}>
              <span style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}>
                Delete
              </span>
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PostPreview;
