import React from 'react';

import styles from '../styles/jugadores.module.css'

import plus from '/icons/plus.svg'
import { Link } from 'react-router-dom';
import usePlayers from '../hooks/usePlayers';

const Jugadores: React.FC = () => {

    const { players, error, loading: _loading } = usePlayers()
    
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
                                <p></p>
                            </div>
                            {
                                players.map(j =>
                                    <div key={j.user?.dni} className={styles.fila}>
                                        <p>{j.user?.nombre}</p>
                                        <p>{j.user?.apellido}</p>
                                        <p>{j.user?.dni}</p>
                                        <Link className={styles.link_ver} to={`/jugador/${j.id}`}>Ver</Link>
                                    </div>)
                            }

                        </div>
                }
            </section>
        </main>
    );
};

export default Jugadores