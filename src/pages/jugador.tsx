import React from 'react';
import { useParams } from 'react-router-dom';

import styles from '../styles/jugador.module.css'
import useJugador from '../hooks/useJugador';

const Jugador: React.FC = () => {
    const { id } = useParams();

    // const navigate = useNavigate()

    const {jugador, error, loading: _loading} = useJugador(id)
    
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                {error && <p className={styles.error}>{error}</p>}
                <h1 className={styles.title}>Jugador</h1>
                <p>{jugador?.user?.nombre}</p>
            </section>
        </main>
    );
};

export default Jugador