import React from 'react';
import { Tournament } from '../vite-env';
import styles from '../styles/cardTournament.module.css'
import { Link } from 'react-router-dom';

import map from '/icons/maps_orange.webp'
import date from '/icons/date_orange.webp'
import category from '/icons/category_orange.webp'

interface Props {
  tournament: Tournament
}

const CardTournament: React.FC<Props> = ({ tournament }) => {
  return (
    <Link to={`/tournament/${tournament.id}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.head}>
        <div className={`${styles.estado} ${tournament.estado == 'Abierto' ? styles.disponible : styles.close}`}></div>
        <p >{tournament.nombre}</p>
      </div>
      <div className={styles.info}>
        <p><img src={map} alt="" />{tournament.lugar}</p>
        <p><img src={date} alt="" /> {tournament.fecha.slice(0, 10)}</p>
        <p><img src={category} alt="" /> {tournament.categoria}</p>
      </div>
    </article>
    </Link >

  );
};

export default CardTournament;