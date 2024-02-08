import React from 'react';
import useInscripcionesJugador from '../hooks/useRegistrationsPlayer';
import ListTournaments from './ListTournaments';

interface Props{
    id: string | number;
}

const InscripcionesJugador: React.FC<Props> = ({id}) => {
    const {inscripciones, error, loading} = useInscripcionesJugador({id});

  return (
    <ListTournaments tournaments={inscripciones} loading={loading} error={error}></ListTournaments>
  );
};

export default InscripcionesJugador