import React from 'react';
// import { useTournaments } from '../store/tournaments';
import { Link,  useParams } from 'react-router-dom';

import styles from '../styles/drawTournament.module.css'
import { potenciasDe2 } from '../services/tools';
import { arrayDeNumbers } from '../services/tools';
import CardMatchEmpty from './CardMatchEmpty';
import CardMatch from './CardMatch';
import { useUser } from '../store/user';
import { useMatches } from '../store/matches';
import { Result } from 'antd';
import { useTournament } from '../hooks/useTournament';
// import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';
import { getRondas } from '../constantes';



const Draw: React.FC = () => {

    const { id } = useParams()
    const { tournament } = useTournament({ id })
    
    const matches = useMatches(state => state.matches);

    const user = useUser((state) => state.user);
    const isAdmin = tournament?.users?.map((u) => u.dni)?.includes(user?.dni ?? 0);

    if (!tournament?.cant_jugadores) {
        return (
            <Result
                title="No hay un cuadro para este torneo aun"
                extra={
                    <Link to={`/tournament/${id}/details`} >Ir a detalles</Link>
                }
            />
        )
    }

    const findPartido = (orden: number, jugadoresXRonda: number) => {
        return matches.find((p) => p.orden == orden && p.jugadoresXRonda == jugadoresXRonda)
    }

    const rondas = potenciasDe2(tournament.cant_jugadores);

    return (
        <>
            <div className={styles.cuadro}>
                {
                    rondas.map((jugadoresPorRonda: number) => {
                        const arrayPartidos = arrayDeNumbers(jugadoresPorRonda)
                        return (
                            <div className={styles.container_ronda} key={jugadoresPorRonda}>
                                <span className={styles.nameRonda}>{getRondas(jugadoresPorRonda)}</span>
                                <div className={styles.ronda} key={jugadoresPorRonda}>
                                    {
                                        arrayPartidos.map((orden) => {
                                            const partido = findPartido(orden, jugadoresPorRonda)
                                            if (partido) {
                                                return (
                                                    <CardMatch match={partido} key={`${partido.id}`} isAdmin={isAdmin} />
                                                )
                                            }
                                            return (
                                                <CardMatchEmpty key={`${orden}-${jugadoresPorRonda}`} isAdmin={isAdmin} jugadoresXRonda={jugadoresPorRonda} orden={orden} idTorneo={id ?? 0} />
                                            )
                                        })
                                    }
                                </div>
                            </div>)
                    })
                }
            </div>
        </>
    );
};

export default Draw