import React from 'react';

type Color = `#${string}`

interface Props {
    color?: Color
}

const IconLogout : React.FC<Props> = ({color = '#000'}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill={color} d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4q0 .425-.288.713T11 5H5v14h6q.425 0 .713.288T12 20q0 .425-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12q0-.425.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"/></svg>
  );
};

export default IconLogout;