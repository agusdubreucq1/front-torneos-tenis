import React from 'react';
import { Match } from '../vite-env';
import styles from '../styles/cardMatch.module.css'
import tick from '/icons/tick.svg'


interface Props {
    match: Match
}

const InfoMatch: React.FC<Props> = ({ match }) => {

    return (
        <div key={match?.id} className={styles.match}>
            <div className={styles.jugadores}>
                <div className={styles.jugador}>
                    <p>{match?.Pareja1.user.apellido + '.' + match?.Pareja1.user.nombre.slice(0, 1).toUpperCase()}</p>
                    {match?.ganador == 1 && <img src={tick}></img>}
                </div>
                <div className={styles.jugador}>
                    <p>{match?.Pareja2.user.apellido + '.' + match?.Pareja2.user.nombre.slice(0, 1).toUpperCase()}</p>
                    {match?.ganador == 2 && <img src={tick}></img>}
                </div>
            </div>
            <div className={styles.resultado}>
                <p>{match?.resultado ? match?.resultado : '-'}</p>
            </div>
        </div>
    );
};

export default InfoMatch