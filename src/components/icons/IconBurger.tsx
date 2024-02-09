import React from 'react';
import { PropsIcon } from '../../vite-env';

const IconBurger: React.FC<PropsIcon> = ({color = '#fff'}) => {

    return (
        <svg viewBox="0 0 66 46" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M3.05542 2.82353H63.0554M3.05542 22.8235H63.0554M3.05542 42.8235H63.0554" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    );
};

export default IconBurger