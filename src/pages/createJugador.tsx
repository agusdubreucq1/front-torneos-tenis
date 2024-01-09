import React from 'react';
import styles from '../styles/createJugador.module.css'
import { URLBACK } from '../constantes';
import { useUser } from '../store/user';

const CreateJugador: React.FC = () => {

    const token = useUser((state)=> state.token);
    const [error, setError] = React.useState<null | String>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data= new FormData(event.currentTarget);
        let body = {
           nombre :  data.get('nombre'),
           apellido : data.get('apellido'),
           dni : data.get('dni')

        }
        const response = await fetch(URLBACK + '/admin/jugador', {
            headers: {
                Authorization: token!
            },
            method: 'POST',
            body: JSON.stringify(body)
            
        })
        if (!response.ok) {
            let json = await response.json();
            setError(json.error)
        }
    }
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Crear jugador</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p>{error}</p>
                    <div>
                        <label>Nombre</label>
                        <input type="text" placeholder="nombre" name='nombre'></input>
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input type="text" placeholder="apellido" name='apellido'></input>
                    </div>
                    <div>
                        <label>DNI</label>
                        <input type="text" placeholder="dni" name='dni'></input>
                    </div>
                    <input type="submit" value="Crear" className={styles.btn}></input>
                </form>
            </section>
        </main>
    );
};

export default CreateJugador