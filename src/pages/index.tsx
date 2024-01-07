import React from 'react';
import ListTournaments from '../components/ListTournaments';

import styles from '../styles/index.module.css'
import { Link } from 'react-router-dom';

import plus from '/icons/plus.svg'

const Index: React.FC = () => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>Mis torneos</h1>
        <Link to="/create/tournament" className={styles.btn}><img src={plus}></img>Crear Torneo</Link>
        <ListTournaments></ListTournaments>
      </section>
    </main>
  );
};

export default Index