import React from 'react';

type Color = `#${string}`
interface Props {
    color?: Color
}

const IconEdit: React.FC<Props> = ({color = '#fff'}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill={color} d="M14.236 1.764a2.621 2.621 0 0 0-3.707 0L2.657 9.636a2.955 2.955 0 0 0-.772 1.354l-.87 3.386a.5.5 0 0 0 .61.608l3.385-.869a2.95 2.95 0 0 0 1.354-.772l7.872-7.872a2.621 2.621 0 0 0 0-3.707m-3 .707a1.621 1.621 0 1 1 2.293 2.293l-.779.779l-2.293-2.293zM9.75 3.957l2.293 2.293l-6.386 6.386a1.954 1.954 0 0 1-.896.51l-2.567.66l.66-2.567a1.94 1.94 0 0 1 .51-.896z" /></svg>
    );
};

export default IconEdit