import React from 'react';
import { Tournament } from '../vite-env';
import styles from '../styles/cardTournament.module.css'
import { Link } from 'react-router-dom';

import map from '/icons/maps_orange.webp'
import date from '/icons/date_orange.webp'
import category from '/icons/category_orange.webp'
import { ESTADOS_TORNEOS } from '../constantes';

interface Props {
  tournament: Tournament
}

const CardTournament: React.FC<Props> = ({ tournament }) => {
  return (
    <Link to={`/tournament/${tournament.id}/details`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.head}>
        <div className={`${styles.estado} ${tournament.estado === ESTADOS_TORNEOS.EN_CURSO ? styles.disponible : (tournament.estado === ESTADOS_TORNEOS.FINALIZADO ? styles.finalizado : styles.suspendido)}`}></div>
        <p >{tournament.nombre}</p>
      </div>
      <div className={styles.info}>
        <div className={styles.dato}><img src={map} alt="" /><p>{tournament.lugar ? tournament.lugar : '-'}</p></div>
        <div className={styles.dato}><img src={date} alt="" /> <p>{tournament.fecha.slice(0, 10)}</p></div>
        <div className={styles.dato}><img src={category} alt="" /><p>{tournament.categoria}</p></div>
      </div>
    </article>
    </Link >

  );
};

export default CardTournament;