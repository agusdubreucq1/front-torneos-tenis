import React from 'react';
import { useParams } from 'react-router-dom';
import { useTournaments } from '../store/tournaments';

import styles from '../styles/tournament.module.css';

const Tournament: React.FC = () => {

    const { id } = useParams();

    const [tournaments, error] = useTournaments((state) => [state.tournaments, state.error]);
    const tournament = tournaments.find((t) => t.id == Number(id));


    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>{tournament?.nombre}</h1>
                <div className={styles.btns}>
                    <div className={styles.opciones}>
                        <button>Detalles</button>
                        <button>Cuadro</button>
                    </div>
                    <button className={styles.btn}>Crear Partido</button>
                </div>
                <div className={styles.detalles}>
                    <div className={styles.dato}>
                        <p>Fecha</p>
                        <p>{tournament?.fecha.slice(0, 10)}</p>
                    </div>

                    <div className={styles.dato}>
                        <p>Lugar</p>
                        <p>{tournament?.lugar}</p>
                    </div>

                    <div className={styles.dato}>
                        <p>Categoria</p>
                        <p>{tournament?.categoria}</p>
                    </div>

                    <div className={styles.descripcion}>
                        <p>Descripcion</p>
                        <p>{tournament?.descripcion}</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Tournament;