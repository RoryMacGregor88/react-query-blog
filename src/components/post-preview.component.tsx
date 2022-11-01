import { FC, ReactElement } from 'react';

import { Button } from '@astrosat/react-utils';

import { Post } from '~/type-constants';

type Props = { post: Post };

const PostPreview: FC<Props> = ({ post }): ReactElement => {
  const { id, author, title, date } = post;
  return (
    <div>
      <h3>{title}</h3>
      <p>
        Created by {author}: {date}
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
