import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '~/components'

import { User } from '~/users';

interface Props {
  currentUser: User | null;
};

const Landing: FC<Props> = ({ currentUser }): ReactElement => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    }}
  >
    <h1 style={{ fontSize: '3rem' }}>Welcome to The Blog App&trade;</h1>
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem 5rem' }}>
      <Link to="/new">
        <Button>Create New Post</Button>
      </Link>
      {!currentUser ? null : (
        <Link to={`/users/${currentUser.id}`}>
          <Button>View Your Posts</Button>
        </Link>
      )}
      <Link to="/posts">
        <Button>View All Posts</Button>
      </Link>
    </div>
  </div>
);

export default Landing;
