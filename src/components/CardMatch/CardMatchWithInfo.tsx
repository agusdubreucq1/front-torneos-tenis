import React from 'react';
import { Match } from '../../vite-env';
import InfoMatch from './InfoMatch';
import styles from '../../styles/cardMatchWithInfo.module.css'
import { getRondas } from '../../constantes';
import { useTournaments } from '../../store/tournaments';

interface Props {
    match: Match
}

const CardMatchWithInfo: React.FC<Props> = ({ match }) => {
    const tournament = useTournaments((state) => state.tournaments).find((t) => t.id == match.torneoId)!

    return (
        <div>
            <div className={styles.container}>
                <InfoMatch match={match} />
            </div>
            <div className={styles.info}>
                <p>{tournament?.nombre}</p>
                <p>-</p>
                <p>{getRondas(match.jugadoresXRonda)}</p>
            </div>
        </div>

    );
};

export default CardMatchWithInfo