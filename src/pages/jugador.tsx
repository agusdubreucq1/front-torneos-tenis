import React, { useEffect } from 'react';
import { Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { URLBACK } from '../constantes';

import styles from '../styles/jugador.module.css'

const Jugador: React.FC = () => {
    const { id } = useParams();
    const [jugador, setJugador] = React.useState<any>({});
    const [error, setError] = React.useState<string>('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchJugador = async () => {
            try {
                const response = await fetch(`${URLBACK}/jugador/${id}`);
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    console.log('error');
                    setError('Error al encontrar el jugador');
                }
                setJugador(data);
            } catch(e){
                console.log('catch error')
                setError('Error de conexion');
            }
            
        };
        fetchJugador();
    }, [])
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                {error && <p className={styles.error}>{error}</p>}
                <h1 className={styles.title}>Jugador</h1>
                <p>{jugador?.user?.nombre}</p>
            </section>
        </main>
    );
};

export default Jugador