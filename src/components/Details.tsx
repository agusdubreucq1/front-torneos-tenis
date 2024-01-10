import React from 'react';
import styles from '../styles/detailsTournament.module.css'
import { useTournaments } from '../store/tournaments';
import { useParams } from 'react-router-dom';


const DetailsTournament: React.FC = () => {

    const {id} = useParams()

    const tournaments = useTournaments((state) => state.tournaments);
    const tournament = tournaments.find((t) => t.id == Number(id));

  return (
    <div className={styles.detalles}>
    <div className={styles.dato}>
        <p>Fecha</p>
        <p>{tournament?.fecha.slice(0, 10)}</p>
    </div>

    <div className={styles.dato}>
        <p>Lugar</p>
        <p>{tournament?.lugar}</p>
    </div>

    <div className={styles.dato}>
        <p>Categoria</p>
        <p>{tournament?.categoria}</p>
    </div>

    <div className={styles.descripcion}>
        <p>Descripcion</p>
        <p>{tournament?.descripcion}</p>
    </div>
</div>
  );
};

export default DetailsTournament;