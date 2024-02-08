import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import styles from '../styles/tournament.module.css';
import { useUser } from '../store/user';
import { useTournament } from '../hooks/useTournament';
import { Result } from 'antd';
import useAutoInscripcion from '../hooks/useAutoInscripcion';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';
import useUpdateTournament from '../hooks/useUpdateTournament';
import { useMatches } from '../store/matches';

const Tournament: React.FC = () => {
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
                        {isAdminOfTournament && <button onClick={handleOpenModalUpdate} className={styles.btn_edit}>Editar torneo</button>}
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.opciones}>
                            <Link to={`/tournament/${id}/details`} className={location.pathname === `/tournament/${id}/details` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Detalles</Link>
                            <Link to={`/tournament/${id}/draw`} className={location.pathname === `/tournament/${id}/draw` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Cuadro</Link>
                        </div>
                        {/* {isAdminOfTournament && <button onClick={handleOpenModalUpdate} className={styles.btn}>Editar torneo</button>} */}
                        {isJugador && !estaInscripto && <button onClick={handleOpenModal} className={styles.btn}>Inscribirse</button>}
                        {/* TODO */}
                        {isJugador && !hasMatches && estaInscripto && <button onClick={handleOpenModal} className={styles.btn}>Desinscribirse</button>}
                        {isAdminOfTournament && <Link to={`/tournament/${id}/inscripcion`} className={styles.btn}>Inscribir jugador</Link>}
                    </div>
                    <Outlet></Outlet>
                </section>
            </main>
        </>
    );
};

export default Tournament;