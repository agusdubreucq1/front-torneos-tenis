import React from 'react';
import ListTournaments from '../components/ListTournaments';

import styles from '../styles/index.module.css'
import { Link } from 'react-router-dom';

import plus from '/icons/plus.svg'
import { useTournaments } from '../store/tournaments';
import { useUser } from '../store/user';

const Index: React.FC = () => {
  const [tournaments, error, loading] = useTournaments((state) => [state.tournaments, state.error, state.loading]);
  const user = useUser((state) => state.user)
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {user?.isAdmin && <Link to="/create/tournament" className={styles.btn}><img alt='icono de mas' src={plus}></img>Crear Torneo</Link>}
        <ListTournaments tournaments={tournaments} loading={loading} error={error}></ListTournaments>
      </section>
    </main>
  );
};

export default Index