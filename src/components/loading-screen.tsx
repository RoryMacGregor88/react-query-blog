import { FC, ReactElement } from 'react';

const LoadingScreen: FC = (): ReactElement => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#283141',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1 style={{ fontSize: '3rem', color: '#000' }}>Loading...</h1>
  </div>
);

export default LoadingScreen;
