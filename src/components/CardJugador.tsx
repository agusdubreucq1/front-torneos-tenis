import React from 'react';
import { Link } from 'react-router-dom';
import { Jugador } from '../vite-env';

interface Props{
    jugador: Jugador
}

const CardJugador: React.FC<Props> = ({jugador}) => {
  return (
    <Link to={`/jugador/${jugador.id}`}>
        <p>{jugador.user?.nombre}</p>
    </Link>
  );
};

export default CardJugador