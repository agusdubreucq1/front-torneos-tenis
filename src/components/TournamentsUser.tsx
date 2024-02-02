import React, { useEffect } from 'react';
import { Tournament } from '../vite-env';
import { getTournamentsByUser } from '../services/tournament';
import { useUser } from '../store/user';
import CardTournament from './CardTournament';

import styles from '../styles/inscripcionesJugador.module.css'

const TournamentsUser: React.FC = () => {

    const [error, setError] = React.useState<string | null>(null);
    const [tournaments, setTournaments] = React.useState<Tournament[]>([]);
    const token = useUser((state) => state.token);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                setError(null);
                const data = await getTournamentsByUser(token!);
                setTournaments(data);
            }
            catch (e) {
                setError("Error al cargar torneos");
            }
        }
        fetchTournaments();
    })
    return (
        <div className={styles.container}>
            {error && <p className='error'>{error}</p>}
            {tournaments.map((t) => <CardTournament key={t.id} tournament={t} />)}
        </div>
    );
};

export default TournamentsUser