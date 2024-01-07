import React from 'react';
import { Tournament } from '../vite-env';
import styles from '../styles/cardTournament.module.css'

interface Props{
  tournament: Tournament
}

const CardTournament: React.FC<Props> = ({tournament}) => {
  return (
    <article className={styles.card}>
      <p>{tournament.nombre}</p>
      <p>{tournament.fecha}</p>
      <p>{tournament.lugar}</p>
      <p>{tournament.estado}</p>
    </article>
  );
};

export default CardTournament;