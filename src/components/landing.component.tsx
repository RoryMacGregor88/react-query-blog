import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { User } from '~/users';

interface Props {
  currentUser: User | null;
};

const buttonStyles = { backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' };

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
        <button style={buttonStyles}>Create New Post</button>
      </Link>
      {!currentUser ? null : (
        <Link to={`/users/${currentUser.id}`}>
          <button style={buttonStyles}>View Your Posts</button>
        </Link>
      )}
      <Link to="/posts">
        <button style={buttonStyles}>View All Posts</button>
      </Link>
    </div>
  </div>
);

export default Landing;
