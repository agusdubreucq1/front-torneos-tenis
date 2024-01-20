import React, { useEffect } from 'react';
import CardTournament from './CardTournament';
import useInscripcionesJugador from '../hooks/useInscripcionesJugador';
import styles from '../styles/inscripcionesJugador.module.css'

interface Props{
    id: string | number;
}

const InscripcionesJugador: React.FC<Props> = ({id}) => {
    const {inscripciones, error, loading} = useInscripcionesJugador({id});

  return (
    <div className={styles.container}>
        {
            inscripciones.map(t => 
                <CardTournament key={t.id} tournament={t}/>
                )
        }

    </div>
  );
};

export default InscripcionesJugador