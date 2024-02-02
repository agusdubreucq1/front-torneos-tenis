import React from 'react';
import usePartidosJugador from '../hooks/usePlayerMatches';
import styles from '../styles/partidoJugador.module.css'
import InfoMatch from './InfoMatch';

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
                    return <InfoMatch key={p.id} match={p} />
                })
                    
            }
        </div>
    );
};

export default PlayerMatches