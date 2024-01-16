import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import styles from '../styles/tournament.module.css';
import { useUser } from '../store/user';
import { useTournament } from '../hooks/useTournament';
import { Result } from 'antd';

const Tournament: React.FC = () => {
    const location = useLocation()

    const { id } = useParams();

    const user = useUser((state) => state.user);

    const {tournament} = useTournament({id})

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
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>{tournament?.nombre}</h1>
                <div className={styles.btns}>
                    <div className={styles.opciones}>
                        <Link to={`/tournament/${id}/details`} className={location.pathname === `/tournament/${id}/details` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Detalles</Link>
                        <Link to={`/tournament/${id}/draw`} className={location.pathname === `/tournament/${id}/draw` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Cuadro</Link>
                    </div>
                    {tournament?.users.map((u) => u.dni).includes(user?.dni) ? <Link to={`/tournament/${id}/inscripcion`} className={styles.btn}>Inscribir jugador</Link> : null}
                </div>
                <Outlet></Outlet>
            </section>
        </main>
    );
};

export default Tournament;