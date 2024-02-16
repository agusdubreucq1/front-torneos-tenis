import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from '../styles/tournament.module.css';
import { useUser } from '../store/user';
import { useTournament } from '../hooks/useTournament';
import { Result, Tabs, TabsProps } from 'antd';
import useAutoInscripcion from '../hooks/useAutoInscripcion';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';
import useUpdateTournament from '../hooks/useUpdateTournament';
import { useMatches } from '../store/matches';
import IconEdit from '../components/icons/IconEdit';
import useAutoDesinscribirse from '../hooks/useAutoDesinscribirse';
import { Helmet } from 'react-helmet-async';

const Tournament: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { id } = useParams();

    useEffect(() => {
        getJugadoresInscriptos(id ?? 0)
        getMatches(id ?? 0)
    }, [])


    const user = useUser((state) => state.user);
    const [players, getJugadoresInscriptos] = useJugadoresInscriptos((state) => [state.jugadoresInscriptos, state.getJugadoresInscriptos]);
    const { handleOpenModal: handleOpenModalUpdate, modal: modalUpdate, contextHolder: contextHolderUpdate } = useUpdateTournament({ id: id ?? 0 })

    const { tournament } = useTournament({ id })
    const [matches, getMatches] = useMatches((state) => [state.matches, state.getMatches]);


    const { handleOpenModal: handleOpenModalInscribirse, modal: modalInscribirse, contextHolder: contextHolderInscribirse } = useAutoInscripcion({ id: id ?? 0 })
    const { handleOpenModal: handleOpenModalDesinscribirse, modal: modalDesinscribirse, contextHolder: contextHolderDesinscribirse } = useAutoDesinscribirse({ id: id ?? 0 })

    const isAdminOfTournament = tournament?.users.map((u) => u.dni).includes(user?.dni ?? 0)
    const isJugador = user?.isAdmin === false;
    const estaInscripto = players.map((p) => p.id).includes(user?.jugador?.id ?? 0)
    const hasMatches = matches.map((m) => m.Pareja2.id).includes(user?.jugador?.id ?? 0) || matches.map((m) => m.Pareja1.id).includes(user?.jugador?.id ?? 0)

    if (!tournament) {
        return (
            <Result
                status={"error"}
                title={"404"}
                subTitle={"No se ha encontrado el torneo"}
                extra={<Link to={"/"} >Volver al inicio</Link>}></Result>
        )
    }

    const itemsAdmin: TabsProps['items'] = [
        {
            key: `/tournament/${id}/details`,
            label: 'Detalles',
        },
        {
            key: `/tournament/${id}/draw`,
            label: 'Cuadro',
        },
        {
            key: `/tournament/${id}/inscripcion`,
            label: 'Inscribir',
        }
    ]

    const itemsPlayer: TabsProps['items'] = [
        {
            key: `/tournament/${id}/details`,
            label: 'Detalles',
        },
        {
            key: `/tournament/${id}/draw`,
            label: 'Cuadro',
            active: location.pathname === `/tournament/${id}/draw`,
        }
    ]

    return (
        <>
            <Helmet>
                <title>{tournament?.nombre} | MisTorneos</title>
                <meta name="description" content="Accede a la informacion del torneo, jugadores inscriptos, cuadro con sus torneos y demas" />
            </Helmet>
            <div key={'holderInscripcion'}>{contextHolderInscribirse}</div>
            <div key={'holderDesinscripcion'}>{contextHolderDesinscribirse}</div>
            <div key={'holderUpdate'}>{contextHolderUpdate}</div>
            {modalInscribirse}
            {modalDesinscribirse}
            {modalUpdate}
            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container_nombre}>
                        <h1 className={styles.title}>{tournament?.nombre}</h1>
                        <h2 className={styles.subtitle}>Torneo</h2>
                        {isAdminOfTournament && <button onClick={handleOpenModalUpdate} className={styles.btn_edit}><IconEdit /></button>}
                    </div>
                    <div className={styles.btns}>
                        <Tabs
                            activeKey={location.pathname}
                            onTabClick={(key) => {
                                navigate(`${key}`);
                            }}
                            items={isAdminOfTournament ? itemsAdmin : itemsPlayer}>
                        </Tabs>
                        {isJugador && !estaInscripto && <button onClick={handleOpenModalInscribirse} className={styles.btn}>Inscribirse</button>}
                        {isJugador && !hasMatches && estaInscripto && <button onClick={handleOpenModalDesinscribirse} className={styles.btn}>Desinscribirse</button>}
                    </div>
                    <Outlet></Outlet>
                </section>
            </main>
        </>
    );
};

export default Tournament;