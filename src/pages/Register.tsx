import React from 'react';
import styles from '../styles/register.module.css'

const Register: React.FC = () => {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <form className={styles.form}>
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <input type="submit" value="Register" />
                </form>
            </section>
        </main>
    );
};

export default Register