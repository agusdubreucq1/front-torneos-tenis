import React from 'react';
import { useUser } from '../store/user';
import { Link } from 'react-router-dom';
import { ConfigProvider, Result, Tabs } from 'antd';
import styles from '../styles/perfil.module.css'
import PlayerMatches from '../components/PlayerMatches';
import TournamentsUser from '../components/TournamentsUser';
import InscripcionesJugador from '../components/InscripcionesJugador';

const Perfil: React.FC = () => {

    const user = useUser((state) => state.user);

    if (!user) {
        return (
            <Result
                status={"error"}
                title={"404"}
                subTitle={"Debe iniciar sesion para ver su perfil"}
                extra={<Link to={"/login"} >Volver al inicio</Link>}
            />
        )
    }

    const tabs_player = [
        { key: '1', label: 'Partidos', children: <PlayerMatches id={user.jugador?.id ?? ''}  /> }, { key: '2', label: 'Torneos', children: <InscripcionesJugador id={user.jugador?.id ?? ''} />  }
    ]

    const tabs_admin = [
        { key: '1', label: 'Torneos', children: <TournamentsUser /> },
    ]

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#000',
                            fontSizeLG: 30
                        },
                    }}
                >
                    <div className={styles.container_nombre}>
                        <h1 className={styles.title}>{user?.nombre + ' ' + user?.apellido}</h1>
                        <h2 className={styles.subtitle}>{user.isAdmin ? 'Administrador' : 'Jugador'}</h2>
                    </div>

                    <Tabs
                        defaultActiveKey="1"
                        centered
                        items={user.isAdmin ? tabs_admin : tabs_player}
                    />
                </ConfigProvider>
            </section>
        </main >
    );
};

export default Perfil;