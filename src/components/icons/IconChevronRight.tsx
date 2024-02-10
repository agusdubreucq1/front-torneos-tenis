import React from 'react';
import { PropsIcon } from '../../vite-env';

const IconChevronRight: React.FC<PropsIcon> = ({ color = '#fff' }) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={color} d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" /></svg>
    );
};

export default IconChevronRight