import { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement | ReactElement[];
};

const SidePanel: FC<Props> = ({ children }): ReactElement => {
  return (
    <div className='flex flex-col items-center w-1/4 p-6 border-r-solid border-r-2 border-r-white'>
      {children}
    </div>
  );
};

export default SidePanel;
