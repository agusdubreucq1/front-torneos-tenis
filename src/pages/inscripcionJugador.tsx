import React from 'react';
import useJugadores from '../hooks/useJugadores';
import { useParams } from 'react-router-dom';

import styles from '../styles/inscripcionJugador.module.css'

const InscripcionJugador: React.FC = () => {
    const { id_torneo } = useParams()
    const { jugadores } = useJugadores()
    return (
            <section>
                <form className={styles.form}>
                    <h1 className={styles.title}>inscribir jugador</h1>
                    <label>Elige un jugador</label>
                    <select>
                        {jugadores.map((jugador) => (
                            <option key={jugador.user?.dni} value={jugador?.user?.dni}>{jugador.user?.dni}</option>
                        ))}
                    </select>
                    <button>Inscribir</button>
                </form>
            </section>
    );
};

export default InscripcionJugador;