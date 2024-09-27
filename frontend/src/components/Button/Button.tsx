import { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <button {...props} className="Button">
      {props.children}
    </button>
  );
};

export default Button;
