import React, { useEffect } from 'react';

import styles from '../styles/jugadores.module.css'

import plus from '/icons/plus.svg'
import { Link } from 'react-router-dom';
import usePlayers from '../hooks/usePlayers';
import { Result, Spin } from 'antd';
import { Player } from '../vite-env';
import Search from 'antd/es/input/Search';
import IconEye from '../components/icons/IconEye';

const Jugadores: React.FC = () => {

    const { players, error, loading: loading } = usePlayers()
    const [filteredPlayers, setFilteredPlayers] = React.useState<Player[]>(players);
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        let newPlayers = players;
        newPlayers = newPlayers.filter((p) => {
            if (search !== '') {
                return p.user?.nombre?.toLowerCase().includes(search.toLowerCase()) || p.user?.apellido?.toLowerCase().includes(search.toLowerCase());
            }
            return true;
        })
        setFilteredPlayers(newPlayers);
    }, [players, search])


    
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Jugadores</h1>
                <Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre o apellido"></Search>

                <Link to={'/create/jugador'} className={styles.btn}><img src={plus}></img>Crear Jugador</Link>
                {
                    error ? <Result status="error" title="Error" subTitle={error} /> :
                        <div className={styles.tabla}>
                            <div className={styles.head}>
                                <p>Nombre</p>
                                <p>Apellido</p>
                                <p>DNI</p>
                                <p></p>
                            </div>
                            {
                                loading 
                                    ? <Spin style={{padding: 40}}></Spin>
                                    : filteredPlayers.map(j =>
                                    <div key={j.user?.dni} className={styles.fila}>
                                        <p>{j.user?.nombre}</p>
                                        <p>{j.user?.apellido}</p>
                                        <p>{j.user?.dni}</p>
                                        <Link className={styles.link_ver} to={`/jugador/${j.id}`}><IconEye /></Link>
                                    </div>)
                            }

                        </div>
                }
            </section>
        </main>
    );
};

export default Jugadores