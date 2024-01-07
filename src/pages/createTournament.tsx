import React from 'react';

import styles from '../styles/createTournament.module.css'
import { useUser } from '../store/user';

const CreateTournament: React.FC = () => {

    const token = useUser((state) => state.token)
    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('enviando form');
        const data = new FormData(event.currentTarget);
        try {
            setError(null)
            setLoading(true)
            const resultado = await fetch('http://localhost:3000/admin/torneo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ?? '',
                },
                body: JSON.stringify({
                    nombre: data.get('nombre'),
                    descripcion: data.get('descripcion'),
                    fecha: data.get('fecha'),
                    lugar: data.get('lugar'),
                    categoria: data.get('categoria'),
                }),
            })
            if (!resultado.ok) {
                let json = await resultado.json();
                setError(json.message);
                console.log(json)
            }
        }
        catch (e) {
            console.log(e);
            setError('Error de conexion')
        } finally {
            setLoading(false)
        }

    }

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Crear torneo</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <p className={styles.error}>{error}</p>}

                    <div>
                        <label>Nombre</label>
                        <input type="text" name='nombre' />
                    </div>

                    <div>
                        <label>Descripción</label>
                        <textarea name='descripcion'></textarea>
                    </div>

                    <div>
                        <label>Fecha</label>
                        <input type="date" name='fecha' />
                    </div>

                    <div>
                        <label>Lugar</label>
                        <input type="text" name='lugar' />
                    </div>

                    <div>
                        <label>Categoria</label>
                        <input type="text" name='categoria' />
                    </div>


                    <button className={styles.btn}>{loading ? 'Cargando...' : 'Crear torneo'}</button>
                </form>
            </section>
        </main>
    );
};

export default CreateTournament;