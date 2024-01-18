import React, { useEffect } from 'react';
// import { useTournaments } from '../store/tournaments';
import { Link, useParams } from 'react-router-dom';


import styles from '../styles/drawTournament.module.css'
import { potenciasDe2 } from '../services/potenciasDe2';
import { arrayDeNumbers } from '../services/arrayDeNumbers';
import CardPartidoVacio from './CardPartidoVacio';
import CardPartido from './CardPartido';
import UsePartidos from '../hooks/usePartidos';
import { useUser } from '../store/user';
import { Result } from 'antd';
import { useTournament } from '../hooks/useTournament';
import useModalForm from '../hooks/useModalForm';



const Draw: React.FC = () => {

    const { id } = useParams()
    const user = useUser((state) => state.user);

    const {  partidos, fetchPartidos } = UsePartidos(id)

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
    const isAdmin = tournament?.users.map((u) => u.dni).includes(user?.dni ?? 0);

    const { handleOpenModal, modal, contextHolder } = useModalForm({
        id: id ?? 0,
        fetchPartidos: fetchPartidos
    })



    const rondas = potenciasDe2(tournament.cant_jugadores);

    return (
        <>
            {contextHolder}
            <div className={styles.cuadro}>
                {
                    rondas.map((jugadoresPorRonda: number) => {
                        const arrayPartidos = arrayDeNumbers(jugadoresPorRonda)
                        return <div className={styles.ronda} key={jugadoresPorRonda}>{arrayPartidos.map((orden) => {
                            if (partidos.filter((p) => p.orden == orden && p.jugadoresXRonda == jugadoresPorRonda).length > 0) {
                                return (
                                    <CardPartido p={partidos.filter((p) => p.orden == orden && p.jugadoresXRonda == jugadoresPorRonda)[0]} key={`${partidos.filter((p) => p.orden == orden)[0].id}`} ></CardPartido>
                                )
                            }
                            return (
                                <CardPartidoVacio key={`${orden}-${jugadoresPorRonda}`}  >
                                    {isAdmin && <button onClick={() => handleOpenModal({ orden, jugadoresXRonda: jugadoresPorRonda })} >+ Partido</button>}
                                </CardPartidoVacio>
                            )
                        })}</div>
                    })
                }

            </div>
            {modal}
        </>
    );
};

export default Draw