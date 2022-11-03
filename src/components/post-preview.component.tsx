import { FC, ReactElement } from 'react';

import { Button } from '@astrosat/react-utils';
import { Link } from 'react-router-dom';

import { Post, User } from '~/type-constants';

type Props = {
  post: Post;
};

const PostPreview: FC<Props> = ({ post }): ReactElement => {
  const { id, authorId, title, date } = post;

  const author: User = { id: '1', username: 'Cat', email: 'test@email.com' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%' }}>
      <h2>{title}</h2>
      <p>
        Created by {author.username} at {date}
      </p>
      <Link to={`/posts/${post.id}`}>
        <Button>
          <span style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}>
            View Full Post
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default PostPreview;
