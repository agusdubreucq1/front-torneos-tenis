import React from 'react';
import { useTournaments } from '../store/tournaments';
import CardTournament from './CardTournament';
import styles from '../styles/listTournaments.module.css'

const ListTournaments: React.FC = () => {

  const [tournaments, error] = useTournaments((state) => [state.tournaments, state.error]);


  return (
    <div className={styles.container}>
      {
        error 
        ? <div className={styles.error}>{error}</div>
        : <ul className={styles.ul}>{tournaments.map((t) => <CardTournament key={t.id} tournament={t}/>)}</ul>
      }
    </div>
  );
};

export default ListTournaments