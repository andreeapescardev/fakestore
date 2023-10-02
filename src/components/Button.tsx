import React from 'react';
import './Button.css';

interface ButtonProps {
    title: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    style?: object
}

const Button: React.FC<ButtonProps> = ({label,title,  onClick, style}) => {
    return (
        <button
            className='fake-store-btn'
            aria-label={label}
            onClick={onClick}
            style={style}
        >
            {title}
        </button>
    );
}

export default Button;
