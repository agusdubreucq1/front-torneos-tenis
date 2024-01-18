import React from 'react';
import { useUser } from '../store/user';
import { Link } from 'react-router-dom';
import { ConfigProvider, Descriptions, DescriptionsProps, Result, Tabs } from 'antd';
import styles from '../styles/perfil.module.css'

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

    const items_jugador: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Nombre',
            children: user?.nombre,
        },
        {
            key: '2',
            label: 'Apellido',
            children: user?.apellido,
        },
        {
            key: '3',
            label: 'torneos jugados',
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
        }
    ]

    const items_admin: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Nombre',
            children: user?.nombre,
        },
        {
            key: '2',
            label: 'Apellido',
            children: user?.apellido,
        },
        {
            key: '3',
            label: 'torneos creados',
            children: 10,
        }
    ]

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#ef2219',
                            fontSizeLG: 30
                        },
                    }}
                >
                    <Descriptions
                        items={user.isAdmin ? items_admin : items_jugador}
                        title="PERFIL"
                        bordered={true}
                        labelStyle={{ background: '#ef2219ee', color: '#fff' }}
                        contentStyle={{ background: '#eee' }}
                    />

                    <Tabs
                        defaultActiveKey="1"
                        centered

                        items={[{ key: '1', label: 'Partidos', children: <div></div> }, { key: '2', label: 'Torneos', children: <div></div> }]}
                    />
                </ConfigProvider>
            </section>
        </main >
    );
};

export default Perfil;