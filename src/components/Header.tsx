import React from 'react';
import { useUser } from '../store/user';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css'

import userImg from '/icons/user.svg'
import logoutImg from '/icons/logout.svg'
import logo from '/logo.png'

const Header: React.FC = () => {
    const [user, logout] = useUser((state) => [state.user, state.logout])

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <img src={logo}></img>
                <ul className={styles.ul}>
                    <li className={styles.li}><Link to="/">Home</Link></li>
                    <li className={styles.li}><Link to="/jugadores">Jugadores</Link></li>
                    {user 
                    ? <li className={styles.li}><img src={userImg} alt='user'></img> {user.username}</li> 
                    : ''}
                    {user 
                    ? <li onClick={logout} className={[styles.li, styles.logout].join(" ")}><img src={logoutImg} alt='logout'></img>Logout</li> 
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