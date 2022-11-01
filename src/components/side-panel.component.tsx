import { Children, FC, ReactElement } from 'react';

type Props = {
  children: typeof Children;
};

const SidePanel: FC<Props> = ({ children }): ReactElement => {
  return <div>{children}</div>;
};

export default SidePanel;
