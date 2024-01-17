import React from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from '../styles/jugador.module.css'
import useJugador from '../hooks/useJugador';
import { DescriptionsProps, Result, Descriptions, Tabs } from 'antd';

const Jugador: React.FC = () => {
    const { id } = useParams();

    const { jugador, error, loading: _loading } = useJugador(id)

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

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Nombre',
            children: jugador.user?.nombre,
        },
        {
            key: '2',
            label: 'Apellido',
            children: jugador.user?.apellido,
        },
        {
            key: '3',
            label: 'Torneos jugados',
            children: 10,
        },
        {
            key: '4',
            label: 'Torneos ganados',
            children: 3,
        },
        {
            key: '5',
            label: 'Partidos jugados',
            children: 16,
        },
        {
            key: '6',
            label: 'Partidos ganados',
            children: 8,
        },
    ]

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <Descriptions
                    items={items}
                    title="Informacion del jugador"
                    bordered
                    labelStyle={{ background: '#ef2219ee', color: '#fff' }}
                    contentStyle={{ background: '#eee' }} />
                <Tabs
                    defaultActiveKey="1"
                    centered
                    
                    items={[{ key: '1', label: 'Partidos', children: <div></div> }, { key: '2', label: 'Torneos', children: <div></div> }]} 
                    />
        </section>
        </main >
    );
};

export default Jugador