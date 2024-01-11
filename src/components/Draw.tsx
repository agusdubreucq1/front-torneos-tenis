import React from 'react';
import { useTournaments } from '../store/tournaments';
import { useParams } from 'react-router-dom';


import styles from '../styles/drawTournament.module.css'
import { potenciasDe2 } from '../services/potenciasDe2';
import { arrayDeNumbers } from '../services/arrayDeNumbers';
import CardPartidoVacio from './CardPartidoVacio';
import CardPartido from './CardPartido';
import UsePartidos from '../hooks/usePartidos';



const Draw: React.FC = () => {

    const { id } = useParams()

    const { loading: _loading, partidos, error: _error_partidos} = UsePartidos(id)

    const [tournaments, _error] = useTournaments((state) => [state.tournaments, state.error]);
    const tournament = tournaments.find((t) => t.id == Number(id));

    if (!tournament?.cant_jugadores) {
        return <div>No hay jugadores</div>
    }
    const rondas = potenciasDe2(tournament.cant_jugadores);

    return (
        <div className={styles.cuadro}>
            {
                rondas.map((jugadoresPorRonda: number) => {
                    const arrayPartidos = arrayDeNumbers(jugadoresPorRonda)
                    return <div className={styles.ronda}>{arrayPartidos.map((orden) => {
                        if (partidos.filter((p) => p.orden == orden && p.jugadoresXRonda == jugadoresPorRonda).length > 0) {
                            return (
                                <CardPartido p={partidos.filter((p) => p.orden == orden)[0]}></CardPartido>
                            )
                        }
                        return (
                            <CardPartidoVacio></CardPartidoVacio>
                        )
                    })}</div>
                })
            }

        </div>
    );
};

export default Draw