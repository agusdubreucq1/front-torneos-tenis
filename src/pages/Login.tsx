import React from 'react';
import { useUser } from '../store/user';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';

import userImg from '/icons/user.svg'
import padlock from '/icons/padlock.svg'
import { URLBACK } from '../constantes';

const Login: React.FC = () => {
    const setUser = useUser((state) => state.setUser);

    const navigate = useNavigate();

    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('enviando form');
        const data = new FormData(event.currentTarget);
        try {
            setError(null)
            setLoading(true)
            const response = await fetch(URLBACK + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dni: data.get('dni'),
                    password: data.get('password'),
                }),
            })
            const result = await response.json();
            if (!response.ok) {
                setError(result.error)
            } else {
                console.log(result);
                setUser(result.user);
                navigate('/')
            }
        } catch (e) {
            console.log(e);
            setError(String(e))
        } finally {
            setLoading(false)
        }

    }
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>

                    <div>
                        <span className={styles.label}><img src={userImg} /></span><input type="text" placeholder='dni' name='dni' ></input>
                    </div>

                    <div>
                        <span className={styles.label}><img src={padlock} /></span><input type="password" name='password' />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>{loading ? 'Cargando...' : 'Login'}</button>
                </form>
            </section>
        </main>
    );
};

export default Login