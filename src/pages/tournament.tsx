import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useTournaments } from '../store/tournaments';

import styles from '../styles/tournament.module.css';

const Tournament: React.FC = () => {
    const location = useLocation()

    const { id } = useParams();

    const [tournaments, _error] = useTournaments((state) => [state.tournaments, state.error]);
    const tournament = tournaments.find((t) => t.id == Number(id));


    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>{tournament?.nombre}</h1>
                <div className={styles.btns}>
                    <div className={styles.opciones}>
                        <Link to={`/tournament/${id}/details`} className={location.pathname === `/tournament/${id}/details` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Detalles</Link>
                        <Link to={`/tournament/${id}/draw`} className={location.pathname === `/tournament/${id}/draw` ? `${styles.selected} ${styles.link_opciones}` : `${styles.link_opciones}`}>Cuadro</Link>
                    </div>
                    <button className={styles.btn}>Crear Partido</button>
                </div>
                <Outlet></Outlet>
            </section>
        </main>
    );
};

export default Tournament;