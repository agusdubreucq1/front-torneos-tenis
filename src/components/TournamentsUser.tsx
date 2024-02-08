import React, { useEffect } from 'react';
import { Tournament } from '../vite-env';
import { getTournamentsByUser } from '../services/tournament';
import { useUser } from '../store/user';
import ListTournaments from './ListTournaments';

const TournamentsUser: React.FC = () => {

    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [tournaments, setTournaments] = React.useState<Tournament[]>([]);
    const token = useUser((state) => state.token);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getTournamentsByUser(token!);
                setTournaments(data);
            }
            catch (e) {
                setError("Error al cargar torneos");
            } finally {
                setLoading(false);
            }
        }
        fetchTournaments();
    }, [])

    return (
        <ListTournaments tournaments={tournaments} loading={loading} error={error}></ListTournaments>
    );
};

export default TournamentsUser