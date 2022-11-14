import { FC, ReactElement } from 'react'
import { Button as AstroButton } from '@astrosat/react-utils'

interface Props {
  children: string | ReactElement;
  onClick?: () => void;
}

const buttonStyles = { backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }

const Button: FC<Props> = ({ children, onClick = () => {} }): ReactElement => (
  <AstroButton onClick={onClick}><span style={buttonStyles}>{children}</span></AstroButton>
);

export default Button;