import React, { useEffect } from 'react';
// import { useTournaments } from '../store/tournaments';
import { Link, useParams } from 'react-router-dom';


import styles from '../styles/drawTournament.module.css'
import { potenciasDe2 } from '../services/potenciasDe2';
import { arrayDeNumbers } from '../services/arrayDeNumbers';
import CardPartidoVacio from './CardPartidoVacio';
import CardPartido from './CardPartido';
import { useUser } from '../store/user';
import { Result } from 'antd';
import { useTournament } from '../hooks/useTournament';
import { usePartidos } from '../store/partidos';



const Draw: React.FC = () => {

    const { id } = useParams()
    const { tournament } = useTournament({ id })

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

    const user = useUser((state) => state.user);
    const isAdmin = tournament?.users?.map((u) => u.dni)?.includes(user?.dni ?? 0);

    const [partidos, getPartidos] = usePartidos((state) => [state.partidos, state.getPartidos]);

    useEffect(() => {
        getPartidos(id ?? 0)
    }, [])

    const findPartido = (orden: number, jugadoresXRonda: number) => {
        return partidos.find((p) => p.orden == orden && p.jugadoresXRonda == jugadoresXRonda)
    }

    const rondas = potenciasDe2(tournament.cant_jugadores);

    return (
        <>
            <div className={styles.cuadro}>
                {
                    rondas.map((jugadoresPorRonda: number) => {
                        const arrayPartidos = arrayDeNumbers(jugadoresPorRonda)
                        return (
                            <div className={styles.ronda} key={jugadoresPorRonda}>
                                {
                                    arrayPartidos.map((orden) => {
                                        const partido = findPartido(orden, jugadoresPorRonda)
                                        if (partido) {
                                            return (
                                                <CardPartido p={partido} key={`${partido.id}`} />
                                            )
                                        }
                                        return (
                                            <CardPartidoVacio key={`${orden}-${jugadoresPorRonda}`} isAdmin={isAdmin} jugadoresXRonda={jugadoresPorRonda} orden={orden} idTorneo={id ?? 0}   />
                                        )
                                    })
                                }
                            </div>)
                    })
                }
            </div>
        </>
    );
};

export default Draw