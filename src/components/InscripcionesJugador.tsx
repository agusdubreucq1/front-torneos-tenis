import React from 'react';
import CardTournament from './CardTournament';
import useInscripcionesJugador from '../hooks/useRegistrationsPlayer';
import styles from '../styles/inscripcionesJugador.module.css'

interface Props{
    id: string | number;
}

const InscripcionesJugador: React.FC<Props> = ({id}) => {
    const {inscripciones, error: _, loading: __} = useInscripcionesJugador({id});

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