import React, { useEffect } from 'react';

import styles from '../styles/jugadores.module.css'

import plus from '/icons/plus.svg'
import { Link } from 'react-router-dom';
import usePlayers from '../hooks/usePlayers';
import { Result, Spin } from 'antd';
import { Player } from '../vite-env';
import Search from 'antd/es/input/Search';
import IconEye from '../components/icons/IconEye';
import { useUser } from '../store/user';
import { Helmet } from 'react-helmet-async';

const Jugadores: React.FC = () => {

    const { players, error, loading: loading } = usePlayers()
    const [filteredPlayers, setFilteredPlayers] = React.useState<Player[]>(players);
    const [search, setSearch] = React.useState('');
    const user = useUser((state) => state.user)

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
        <>
        <Helmet>
            <title>Jugadores | MisTorneos</title>
            <meta name="description" content="Accede a los todos los jugadores disponibles y accede a sus detalles" />
        </Helmet>
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Jugadores</h1>
                <div className={styles.filters}>
                    <Search value={search} style={{ maxWidth: 300 }} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre o apellido"></Search>
                </div>

                {user?.isAdmin && <Link to={'/create/jugador'} className={styles.btn}><img alt='icono de mas' src={plus}></img>Crear Jugador</Link>}
                {
                    error ? <Result status="error" title="Error" subTitle={error} /> :
                        loading ? <Spin style={{ padding: 40 }}></Spin> :
                            <div className={styles.tabla}>
                                <div className={styles.head}>
                                    <p>Nombre</p>
                                    <p>Apellido</p>
                                    <p>DNI</p>
                                    <p></p>
                                </div>
                                {filteredPlayers.map(j =>
                                    <div key={j.user?.dni} className={styles.fila}>
                                        <p>{j.user?.nombre}</p>
                                        <p>{j.user?.apellido}</p>
                                        <p>{j.user?.dni}</p>
                                        <Link className={styles.link_ver} to={`/jugador/${j.id}`}><IconEye /></Link>
                                    </div>)}
                            </div>
                }
            </section>
        </main>
        </>
    );
};

export default Jugadores