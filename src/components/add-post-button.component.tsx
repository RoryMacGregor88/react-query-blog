import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

const AddPostButton: FC = (): ReactElement => {
  return (
    <Link to="/new">
      <button
        aria-label={'add post'}
        className={
          'btn btn-primary btn-circle text-3xl transition-transform ease-in-out hover:bg-accent hover:text-accent focus:outline-none focus-visible:outline-accent'
        }
      >
        <span style={{ marginTop: '-0.2rem' }}>+</span>
      </button>
    </Link>
  );
};

export default AddPostButton;
