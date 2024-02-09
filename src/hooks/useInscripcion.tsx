import React from 'react';
import { inscribirJugador } from '../services/inscripciones';
import { useUser } from '../store/user';
import { FormInstance, message } from 'antd';
import { getJugadoresNoInscriptos } from '../services/inscripciones';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';

const useInscripcion = ({id, form}: {id: string | number, form?: FormInstance<any>}) => {
  const [error, setError] = React.useState<null | String>(null);
  const [loading, setLoading] = React.useState(false);
  const token = useUser((state) => state.token);
  const [messageAPI, contextHolder] = message.useMessage();

  const getJugadoresInscriptos = useJugadoresInscriptos((state) =>state.getJugadoresInscriptos);

  const [jugadoresNoInscriptos, setJugadoresNoInscriptos] = React.useState<any[]>([]);

  const fetchJugadores = async () => {
    try {
      setError(null);
      const data = await getJugadoresNoInscriptos(id);
      setJugadoresNoInscriptos(data);
    } catch (e: any) {
      if (e.name === 'Error') {
        setError(e.message);
      } else {
        setError('Error de conexion');
      }
    } 
  }

  React.useEffect(() => {
    fetchJugadores();
  }, [])

  const handleFinish = async (body: any) => {
    console.log(body)
    try {
      setError(null);
      setLoading(true);
      await inscribirJugador(id , token!, body);
      messageAPI.success('Jugador inscripto con exito');
      fetchJugadores();
      getJugadoresInscriptos(id);
      form?.resetFields();
    } catch (e: any) {
      if (e.name === 'Error') {
        setError(e.message);
      } else {
        setError('Error de conexion');
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    contextHolder,
    loading,
    handleFinish,
    jugadoresNoInscriptos

  }
};

export default useInscripcion