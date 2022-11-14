import { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement | ReactElement[];
};

const SidePanel: FC<Props> = ({ children }): ReactElement => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '25%', borderRight: '2px solid #fff'}}>
      {children}
    </div>
  );
};

export default SidePanel;
