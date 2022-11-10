import { FC, ReactElement } from 'react';

import { Button } from '@astrosat/react-utils';
import { Link } from 'react-router-dom';

import { Post, useUser } from '~/hooks';

type Props = {
  post: Post;
  isAuthor: boolean;
};

const PostPreview: FC<Props> = ({ post, isAuthor }): ReactElement | null => {
  const { authorId, title, date } = post;

  const { data: author } = useUser(authorId);

  return !author ? null : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%' }}>
      <h2>{title}</h2>
      <p>
        Created by {author.username} at {date}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Link to={`/posts/${post.id}`}>
          <Button>
            <span style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}>
              View Full Post
            </span>
          </Button>
        </Link>
        {isAuthor ? (
          <Link to={`/posts/${post.id}/edit`}>
            <Button>
              <span style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}>
                Edit Post
              </span>
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default PostPreview;
