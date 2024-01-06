import React from 'react';
import { useUser } from '../store/user';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css'

import userImg from '/icons/user.svg'

const Header: React.FC = () => {
    const [user, logout] = useUser((state) => [state.user, state.logout])

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    {user ? <li onClick={logout} className={styles.li}>Logout</li> : <li className={styles.li}><Link to="/login">Login</Link></li>}
                    {user ? <li className={styles.li}><img src={userImg} alt='user'></img> {user.username}</li> : ''}
                </ul>
            </nav>
        </header>
    );
};

export default Header