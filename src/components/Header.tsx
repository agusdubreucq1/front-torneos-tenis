import React from 'react';
import { useUser } from '../store/user';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css'

import logo from '/logo.png'
import IconUser from './IconUser';
import { Drawer, Modal, Popover } from 'antd';
import IconLogout from './IconLogout';
import IconHome from './IconHome';
import IconPlayer from './IconPlayer';
import IconBurger from './IconBurger';

const Header: React.FC = () => {
    const [user, logout] = useUser((state) => [state.user, state.logout])
    const [openDrawer, setOpenDrawer] = React.useState(false)

    const [modalOpen, setModalOpen] = React.useState(false)

    const handleClose = () => {
        setOpenDrawer(false)
    }

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
                    <li className={styles.li}><Link to="/"><IconHome />Home</Link></li>
                    <li className={styles.li}><Link to="/jugadores"><IconPlayer /> Jugadores</Link></li>
                    {user
                        ?
                        <li className={styles.li}><Popover placement="bottomRight" content={content} trigger="hover"><div className={styles.link_user}><IconUser />{user.nombre}</div></Popover></li>
                        :
                        <>
                            <li className={styles.li}><Link to="/login">Login</Link></li>
                            <li className={[styles.li, styles.register].join(" ")}><Link to="/register">Register</Link></li>
                        </>
                    }
                </ul>
                <div onClick={() => setOpenDrawer(!openDrawer)} className={styles.burger}>
                    <IconBurger color='#fff' />
                </div>
            </nav>
            <Drawer
                title="Menu"
                placement={'left'}
                // width={500}
                onClose={handleClose}
                open={openDrawer}
                styles={{body: {padding: 0}}}
            >
                <ul className={styles.ul_drawer}>
                    <li className={styles.li} onClick={handleClose}><Link to="/"><IconHome color='#000' />Home</Link></li>
                    <li className={styles.li} onClick={handleClose}><Link to="/jugadores"><IconPlayer color='#000' /> Jugadores</Link></li>
                    {user
                        ?
                        <li onClick={handleClose} className={styles.li}><Popover placement="bottomRight" content={content} trigger="hover"><div className={styles.link_user}><IconUser color='#000' />{user.nombre}</div></Popover></li>
                        :
                        <>
                            <li onClick={handleClose} className={styles.li}><Link to="/login">Login</Link></li>
                            <li onClick={handleClose} className={[styles.li, styles.register].join(" ")}><Link to="/register">Register</Link></li>
                        </>
                    }
                </ul>

            </Drawer>
        </header>
    );
};

export default Header