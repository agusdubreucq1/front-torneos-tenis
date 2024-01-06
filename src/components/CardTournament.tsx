import React from 'react';
import { Tournament } from '../vite-env';

interface Props{
  tournament: Tournament
}

const CardTournament: React.FC<Props> = ({tournament}) => {
  return (
    <article>
      {tournament.nombre}
    </article>
  );
};

export default CardTournament;