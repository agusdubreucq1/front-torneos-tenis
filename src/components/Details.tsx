import React from 'react';
import { Tournament } from '../vite-env';

import styles from '../styles/details.module.css'

interface Props{
    tournament: Tournament
}

const DetailsTournament: React.FC<Props> = ({tournament}) => {
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