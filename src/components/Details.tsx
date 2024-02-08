import React from 'react';
import styles from '../styles/detailsTournament.module.css'
import { useTournaments } from '../store/tournaments';
import { useParams } from 'react-router-dom';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';
import IconDate from './icons/IconDate';
import IconPlace from './icons/IconPlace';
import IconCategory from './icons/IconCategory';


const DetailsTournament: React.FC = () => {

    const { id } = useParams()

    const tournaments = useTournaments((state) => state.tournaments);
    const tournament = tournaments.find((t) => t.id == Number(id));
    const players = useJugadoresInscriptos((state) => state.jugadoresInscriptos)

    return (
        <div className={styles.detalles}>
            <div className={styles.dato}>
                <IconDate />
                <p>{tournament?.fecha.slice(0, 10)}</p>
            </div>

            <div className={styles.dato}>
                <IconPlace />
                <p>{tournament?.lugar ? tournament?.lugar : '-'}</p>
            </div>

            <div className={styles.dato}>
                <IconCategory />
                <p>{tournament?.categoria}</p>
            </div>

            <div className={styles.descripcion}>
                <p>Descripcion</p>
                <p>{tournament?.descripcion ? tournament?.descripcion : '-'}</p>
            </div>

            <div className={styles.descripcion}>
                <p>Inscriptos</p>
                <div className={styles.jugadores}>
                    {players.map(p => <p key={p.id} className={styles.jugador}>{p.user?.nombre + ' ' + p.user?.apellido}</p>)}
                </div>
            </div>
        </div>
    );
};

export default DetailsTournament;