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
    <Link to={`/tournament/${tournament.id}/details`} className={styles.link} aria-label="Detalles del torneo">
      <article className={styles.card}>
        <header className={styles.head}>
          <div className={`${styles.estado} ${tournament.estado === ESTADOS_TORNEOS.EN_CURSO ? styles.disponible : (tournament.estado === ESTADOS_TORNEOS.FINALIZADO ? styles.finalizado : styles.suspendido)}`}></div>
          <p style={{ fontWeight: 'bold' }}>{tournament.nombre}</p>
        </header>
        <section className={styles.info}>
          <div className={styles.dato}><img src={map} alt="icono de mapa" /><p>{tournament.lugar ? tournament.lugar : '-'}</p></div>
          <div className={styles.dato}><img src={date} alt="icono de fecha" /> <p>{tournament.fecha.slice(0, 10)}</p></div>
          <div className={styles.dato}><img src={category} alt="icono de categoria" /><p>{tournament.categoria}</p></div>
        </section>
      </article>
    </Link >

  );
};

export default CardTournament;