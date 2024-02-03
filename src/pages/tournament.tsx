import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import styles from '../styles/tournament.module.css';
import { useUser } from '../store/user';
import { useTournament } from '../hooks/useTournament';
import { Result } from 'antd';
import useAutoInscripcion from '../hooks/useAutoInscripcion';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';

const Tournament: React.FC = () => {
    const location = useLocation()
    const { id } = useParams();
    
    useEffect(() => {
        getJugadoresInscriptos(id ?? 0)
    }, [])

    const user = useUser((state) => state.user);
    const [players, getJugadoresInscriptos] = useJugadoresInscriptos((state) => [state.jugadoresInscriptos,state.getJugadoresInscriptos]);
    
    const {tournament} = useTournament({id})

    const { handleOpenModal, modal, contextHolder} = useAutoInscripcion({id: id ?? 0})

    const isAdminOfTournament = tournament?.users.map((u) => u.dni).includes(user?.dni ?? 0)
    const isJugador = user?.isAdmin === false;
    const estaInscripto = players.map((p) => p.id).includes(user?.jugador?.id ?? 0)

    if(!tournament){
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
        {contextHolder}
        {modal}
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>{tournament?.nombre}</h1>
                <div className={styles.btns}>
                    <div className={styles.opciones}>
                        <Link to={`/tournament/${id}/details`} className={location.pathname === `/tournament/${id}/details` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Detalles</Link>
                        <Link to={`/tournament/${id}/draw`} className={location.pathname === `/tournament/${id}/draw` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Cuadro</Link>
                    </div>
                    {isJugador && !estaInscripto && <button onClick={handleOpenModal} className={styles.btn}>Inscribirse</button>}
                    {isAdminOfTournament && <Link to={`/tournament/${id}/inscripcion`} className={styles.btn}>Inscribir jugador</Link>}
                </div>
                <Outlet></Outlet>
            </section>
        </main>
        </>
    );
};

export default Tournament;