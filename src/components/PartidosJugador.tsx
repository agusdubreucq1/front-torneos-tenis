import React from 'react';
import CardPartido from './CardPartido';
import usePartidosJugador from '../hooks/usePartidosJugador';
import CardPartidoVacio from './CardPartidoVacio';
import styles from '../styles/partidoJugador.module.css'

interface Props {
    id: string | number
}


const PartidosJugador: React.FC<Props> = ({ id }) => {

    const { partidos, error, loading } = usePartidosJugador({ id });

    return (
        <div className={styles.container}>
            {error && <p className='error'>{error}</p>}
            {
                partidos.filter(p=> p.resultado != null).map((p) =>{
                    return <CardPartido key={p.id} p={p} />
                })
                    
            }
        </div>
    );
};

export default PartidosJugador