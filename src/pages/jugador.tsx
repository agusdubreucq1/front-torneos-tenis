import React from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from '../styles/jugador.module.css'
import useJugador from '../hooks/usePlayer';
import {  Result,  Tabs, ConfigProvider } from 'antd';
import PlayerMatches from '../components/PlayerMatches';
import InscripcionesJugador from '../components/InscripcionesJugador';

const Jugador: React.FC = () => {
    const { id } = useParams();

    const { jugador, error: _error, loading: _loading } = useJugador(id)

    if (!jugador) {
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
                <ConfigProvider
                    theme={{
                        token: {
                            // colorPrimary: '#ef2219',
                            colorPrimary: '#000',
                            fontSizeLG: 30
                        },
                    }}
                >
                    <div className={styles.container_nombre}>
                        <h1 className={styles.title}>{jugador.user?.nombre + ' ' + jugador.user?.apellido}</h1>
                        <h2 className={styles.subtitle}>Jugador</h2>
                    </div>

                    <Tabs
                        defaultActiveKey="1"
                        centered

                        items={[{ key: '1', label: 'Partidos', children: <PlayerMatches id={id as string} /> },
                        { key: '2', label: 'Torneos', children: <InscripcionesJugador id={id as string} /> }]}
                    />
                </ConfigProvider>

            </section>
        </main >
    );
};

export default Jugador