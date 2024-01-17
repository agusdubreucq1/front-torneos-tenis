import React from 'react';
import { useUser } from '../store/user';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css'

import logo from '/logo.png'
import IconUser from './IconUser';
import { Modal, Popover } from 'antd';
import IconLogout from './IconLogout';

const Header: React.FC = () => {
    const [user, logout] = useUser((state) => [state.user, state.logout])

    const [modalOpen, setModalOpen] = React.useState(false)

    const handleOk = () => {
        setModalOpen(false)
        logout()
    }

    const handleCancel = () => {
        setModalOpen(false)
    }

    const content = (
        <div className={styles.popover}>
            <Link to={'/perfil'} className={styles.link_user_popover}>Ver Perfil</Link>
            <div onClick={() => setModalOpen(true)} className={styles.logout_popover}><IconLogout color='#000' />Logout</div>
        </div>
    )

    return (
        <header className={styles.header}>
            <Modal
                centered
                children={<><p></p></>}
                okButtonProps={{ style: { backgroundColor: '#f44336', border: 'none' } }}
                okText="Confirmar"
                title='¿Desea cerrar sesión?' open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
            </Modal>
            <nav className={styles.nav}>
                <img src={logo}></img>
                <ul className={styles.ul}>
                    <li className={styles.li}><Link to="/">Home</Link></li>
                    <li className={styles.li}><Link to="/jugadores">Jugadores</Link></li>
                    {user
                        ? <li className={styles.li}><Popover placement="bottomRight" content={content} trigger="hover"><Link to={'/perfil'} className={styles.link_user}><IconUser />{user.nombre}</Link></Popover></li>
                        : ''}
                    {user
                        ? ''
                        : <li className={styles.li}><Link to="/login">Login</Link></li>}
                    {user
                        ? ''
                        : <li className={[styles.li, styles.register].join(" ")}><Link to="/register">Register</Link></li>}

                </ul>
            </nav>
        </header>
    );
};

export default Header