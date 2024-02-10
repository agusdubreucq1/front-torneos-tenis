import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from '../styles/drawTournament.module.css'
import { max, potenciasDe2 } from '../services/tools';
import { arrayDeNumbers } from '../services/tools';
import CardMatchEmpty from './CardMatch/CardMatchEmpty';
import CardMatch from './CardMatch/CardMatch';
import { useUser } from '../store/user';
import { useMatches } from '../store/matches';
import { Result } from 'antd';
import { useTournament } from '../hooks/useTournament';
import { getRondas } from '../constantes';
import useResizeObserver from 'use-resize-observer';
import IconChevronLeft from './icons/IconChevronLeft';
import IconChevronRight from './icons/IconChevronRight';



const Draw: React.FC = () => {

    const drawRef = useRef<HTMLDivElement>(null)
    const { width, height } = useResizeObserver<HTMLDivElement>({ref: drawRef});

    const cantidadDeRondas = Math.floor((width! + 40) / 260) === 0 ? 1 : Math.floor((width! + 40) / 260) // width mas el padding que se resta solo

    useEffect(() => {
        console.log('width', width, 'height', height, cantidadDeRondas)
    }, [width, height])

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
            <div className={styles.container} >
                <span className={[styles.btn_scroll_left, styles.btn_scroll].join(' ')} onClick={() => drawRef?.current?.scrollTo({ left: drawRef?.current.scrollLeft - max(260,((width! + 40) / cantidadDeRondas)), behavior: 'smooth' })}><IconChevronLeft color='#000' /></span>
                <span className={[styles.btn_scroll_right, styles.btn_scroll].join(' ')} onClick={() => drawRef?.current?.scrollTo({ left: drawRef?.current.scrollLeft + max(260,((width! + 40) / cantidadDeRondas)), behavior: 'smooth' })}><IconChevronRight color='#000' /></span>
                <div className={styles.cuadro} ref={drawRef}>
                    {
                        rondas.map((jugadoresPorRonda: number) => {
                            const arrayPartidos = arrayDeNumbers(jugadoresPorRonda)
                            return (
                                <div className={styles.container_ronda} key={jugadoresPorRonda}>
                                    <span className={styles.nameRonda}>{getRondas(jugadoresPorRonda)}</span>

                                    {/* <div className={styles.ronda} key={jugadoresPorRonda} style={{ width: `calc(calc(min(100dvw, 1200px) - 80px) / ${cantidadDeRondas} - 40px)` }} > */}
                                    <div className={styles.ronda} key={jugadoresPorRonda} style={{ width: `calc(${width! + 40}px / ${cantidadDeRondas} - 40px)` }} >
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
            </div>
        </>
    );
};

export default Draw