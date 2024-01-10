import React, { useEffect, useState } from 'react';
// import { useTournaments } from '../store/tournaments';
import { useParams } from 'react-router-dom';
import { URLBACK } from '../constantes';
import { Partido } from '../vite-env';
import { useUser } from '../store/user';

import styles from '../styles/drawTournament.module.css'

const Draw: React.FC = () => {

    const { id } = useParams()

    const token = useUser((state) => state.token);

    const [partidos, setPartidos] = useState<Partido[]>([]);
    useEffect(() => {
        const fetchPartidos = async () => {
            console.log('token: ', token);
            try {
                const response = await fetch(`${URLBACK}/admin/torneo/${id}/partidos`, {
                    headers: {
                        "Authorization": token ?? '',
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    console.log('error');
                    throw new Error('Error al encontrar los partidos');

                }
                setPartidos(data);
            } catch (e) {
                console.log(e);
            }
        };
        if (token) {
            fetchPartidos();
        }

    }, [token])

    // const [tournaments, error] = useTournaments((state) => [state.tournaments, state.error]);
    // const tournament = tournaments.find((t) => t.id == Number(id));
    return (
        <div className={styles.cuadro}>
            {partidos.map((p) =>
                <div key={p.id} className={styles.partido}>
                    <div className={styles.jugadores}>
                        <p>{p.Pareja1.user.apellido + '.' + p.Pareja1.user.nombre.slice(0, 1).toUpperCase()}</p>
                        <p>{p.Pareja2.user.apellido + '.' + p.Pareja2.user.nombre.slice(0, 1).toUpperCase()}</p>
                    </div>
                    <div className={styles.resultado}>
                        <p>{p.resultado}</p>
                    </div>
                </div>)}

        </div>
    );
};

export default Draw