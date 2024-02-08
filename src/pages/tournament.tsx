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

const Tournament: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    console.log(location)

    const [pathname, setPathname] = React.useState(location.pathname)

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


    const { handleOpenModal, modal, contextHolder } = useAutoInscripcion({ id: id ?? 0 })

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
            key: 'details',
            label: 'Detalles',
        },
        {
            key: 'draw',
            label: 'Cuadro',
        },
        {
            key: 'inscripcion',
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
            active: pathname === `/tournament/${id}/draw`,

        }
    ]

    return (
        <>
            <div key={'holderInscripcion'}>{contextHolder}</div>
            <div key={'holderUpdate'}>{contextHolderUpdate}</div>
            {modal}
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
                            activeKey={pathname}
                            onTabClick={(key) => {
                                navigate(`${key}`);
                                setPathname(`${key}`);
                            }}
                            items={isAdminOfTournament ? itemsAdmin : itemsPlayer}>
                        </Tabs>
                        {isJugador && !estaInscripto && <button onClick={handleOpenModal} className={styles.btn}>Inscribirse</button>}
                        {/* TODO */}
                        {isJugador && !hasMatches && estaInscripto && <button onClick={handleOpenModal} className={styles.btn}>Desinscribirse</button>}
                    </div>
                    <Outlet></Outlet>
                </section>
            </main>
        </>
    );
};

export default Tournament;