import { FC, ReactElement } from 'react';

import { Button } from '@astrosat/react-utils';

import { Post, User } from '~/type-constants';

type Props = { post: Post };

const users: User[] = [];

const PostPreview: FC<Props> = ({ post }): ReactElement => {
  const { id, authorId, title, date } = post;
  const author = users.find(user => user.id === authorId);
  return (
    <div style={{ width: '50%' }}>
      <h2>{title}</h2>
      <p>
        Created by user {author} at {date}
      </p>
      <Button
        onClick={() => {
          console.log('Clicked Post: ', id);
        }}
      >
        <span>View Full Post</span>
      </Button>
    </div>
  );
};

export default PostPreview;
