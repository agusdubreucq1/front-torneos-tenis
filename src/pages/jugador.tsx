import React from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from '../styles/jugador.module.css'
import useJugador from '../hooks/useJugador';
import { Result } from 'antd';

const Jugador: React.FC = () => {
    const { id } = useParams();

    const {jugador, error, loading: _loading} = useJugador(id)

    if(!jugador){
        return (
            <Result
            status={"error"}
            title={"404"}
            subTitle={"No se ha encontrado el jugador"}
            extra={<Link to={"/"} >Volver al inicio</Link>}
            />
        )
    }
    
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