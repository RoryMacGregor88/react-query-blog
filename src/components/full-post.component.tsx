import { FC, ReactElement } from 'react';

import { Post } from '~/type-constants';

type Props = { post: Post };

const FullPost: FC<Props> = ({ post }): ReactElement => {
  const { author, title, date, body } = post;
  return (
    <div>
      <h3>{title}</h3>
      <p>{body}</p>
      <p>
        Created by {author}: {date}
      </p>
    </div>
  );
};

export default FullPost;
