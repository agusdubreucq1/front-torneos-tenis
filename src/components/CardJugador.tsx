import React from 'react';
import { Link } from 'react-router-dom';
import {  Player } from '../vite-env';

interface Props{
    jugador: Player
}

const CardJugador: React.FC<Props> = ({jugador}) => {
  return (
    <Link to={`/jugador/${jugador.id}`}>
        <p>{jugador.user?.nombre}</p>
    </Link>
  );
};

export default CardJugador