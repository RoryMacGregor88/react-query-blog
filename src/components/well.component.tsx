import { FC, ReactElement, useEffect } from 'react';

type Params = {
  error?: boolean;
  message: string;
  close: () => void;
};

const Well: FC<Params> = ({ error = false, message, close }): ReactElement => {
  useEffect(() => {
    setTimeout(close, 5000);
  }, [close]);

  const color = error ? 'red' : 'green';

  return (
    <div
      style={{
        padding: '2rem',
        margin: '2rem auto',
        borderRadius: '5px',
        border: `5px solid ${color}`,
        color,
        backgroundColor: '#283141',
        width: '25%',
      }}
    >
      <h3>{error ? 'Error!' : 'Success.'}</h3>
      <p>{message}</p>
    </div>
  );
};

export default Well;
