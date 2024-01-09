import React, { useEffect } from 'react';
import { URLBACK } from '../constantes';
import { Jugador } from '../vite-env';

import styles from '../styles/jugadores.module.css'

import plus from '/icons/plus.svg'
import { Link } from 'react-router-dom';

const Jugadores: React.FC = () => {

    const [jugadores, setJugadores] = React.useState<Jugador[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchJugadores = async () => {
            try {
                const response = await fetch(URLBACK + '/admin/jugador');
                const data = await response.json();
                if (!response.ok) {
                    setError(data.error);
                }
                setJugadores(data);
            } catch (e) {
                console.log('catch error')
                setError('Error de conexion');
            }

        };
        fetchJugadores();
    }, [])
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Jugadores</h1>

                <Link to={'/create/jugador'} className={styles.btn}><img src={plus}></img>Crear Jugador</Link>
                {
                    error ? <p className={styles.error}>{error}</p> :
                        <div className={styles.tabla}>
                            <div className={styles.head}>
                                <p>Nombre</p>
                                <p>Apellido</p>
                                <p>DNI</p>
                            </div>
                            {
                                jugadores.map(j=>
                                    <div>
                                        <p>{j.user?.nombre}</p>
                                        <p>{j.user?.apellido}</p>
                                        <p>{j.user?.dni}</p>
                                    </div>)
                            }

                        </div>
            }
            </section>
        </main>
    );
};

export default Jugadores