import React from 'react';


type Color = `#${string}`
interface Props{
    color?: Color
}

const IconUser: React.FC<Props> = ({color = '#fff'}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill={color} d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24M74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0M96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32m97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0"/></svg>
  );
};

export default IconUser;