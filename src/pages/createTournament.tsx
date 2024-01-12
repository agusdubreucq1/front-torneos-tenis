import React from 'react';
import styles from '../styles/createTournament.module.css'
import useCreateTournament from '../hooks/useCreateTournament';


const CreateTournament: React.FC = () => {

    const { error, errores_campos, loading, handleSubmit} = useCreateTournament()

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Crear torneo</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <p className={styles.error}>{error}</p>}

                    <div>
                        <label>Nombre <span>*</span></label>
                        <input type="text" name='nombre' />
                        {errores_campos['nombre'] && <p className={styles.error_campo}>{errores_campos['nombre']}</p>}
                    </div>

                    <div>
                        <label>Descripción </label>
                        <textarea name='descripcion'></textarea>
                    </div>

                    <div>
                        <label>Fecha <span>*</span></label>
                        <input type="date" name='fecha' />
                        {errores_campos['fecha'] && <p className={styles.error_campo}>{errores_campos['fecha']}</p>}
                    </div>

                    <div>
                        <label>Lugar</label>
                        <input type="text" name='lugar' />
                    </div>

                    <div>
                        <label>Categoria <span>*</span></label>
                        <input type="text" name='categoria' />
                        {errores_campos['categoria'] && <p className={styles.error_campo}>{errores_campos['categoria']}</p>}
                    </div>

                    <div>
                        <label>cantidad jugadores</label>
                        <select name="cant_jugadores">
                            <option value={0}>seleccionar</option>
                            <option value={32}>32</option>
                            <option value={16}>16</option>
                            <option value={8}>8</option>
                        </select>
                    </div>


                    <button className={styles.btn}>{loading ? 'Cargando...' : 'Crear torneo'}</button>
                </form>
            </section>
        </main>
    );
};

export default CreateTournament;