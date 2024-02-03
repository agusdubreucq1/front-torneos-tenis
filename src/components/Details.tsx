import React from 'react';
import styles from '../styles/detailsTournament.module.css'
import { useTournaments } from '../store/tournaments';
import { useParams } from 'react-router-dom';
import usePlayersFromTournament from '../hooks/usePlayersFromTournament';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';


const DetailsTournament: React.FC = () => {

    const {id} = useParams()

    const tournaments = useTournaments((state) => state.tournaments);
    const tournament = tournaments.find((t) => t.id == Number(id));
    // const {players} = usePlayersFromTournament({id: id ?? 0})
    const players = useJugadoresInscriptos((state) => state.jugadoresInscriptos)

  return (
    <div className={styles.detalles}>
    <div className={styles.dato}>
        <p>Fecha</p>
        <p>{tournament?.fecha.slice(0, 10)}</p>
    </div>

    <div className={styles.dato}>
        <p>Lugar</p>
        <p>{tournament?.lugar ? tournament?.lugar : '-'}</p>
    </div>

    <div className={styles.dato}>
        <p>Categoria</p>
        <p>{tournament?.categoria}</p>
    </div>

    <div className={styles.descripcion}>
        <p>Descripcion</p>
        <p>{tournament?.descripcion ? tournament?.descripcion : '-'}</p>
    </div>

    <div className={styles.descripcion}>
        <p>Inscriptos</p>
        <p>{players.map(p => p.user?.nombre + ' ' + p.user?.apellido).join(', ')}</p>
    </div>
</div>
  );
};

export default DetailsTournament;