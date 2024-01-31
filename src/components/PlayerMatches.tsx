import React from 'react';
import CardPartido from './cardMatch';
import usePartidosJugador from '../hooks/usePlayerMatches';
import styles from '../styles/partidoJugador.module.css'

interface Props {
    id: string | number
}


const PlayerMatches: React.FC<Props> = ({ id }) => {

    const { partidos, error, loading: _loading } = usePartidosJugador({ id });

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

export default PlayerMatches