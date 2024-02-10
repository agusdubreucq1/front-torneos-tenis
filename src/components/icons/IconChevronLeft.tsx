import React from 'react';
import { PropsIcon } from '../../vite-env';

const IconChevronLeft: React.FC<PropsIcon> = ({ color = '#fff' }) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={color} d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12q0-.2.063-.375T8.7 11.3l4.6-4.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7z" /></svg>
    );
};

export default IconChevronLeft