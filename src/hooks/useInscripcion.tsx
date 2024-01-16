import React from 'react';
import { inscribirJugador } from '../services/inscribirJugador';
import { useUser } from '../store/user';
import { message } from 'antd';

const useInscripcion = ({id}: {id: string | number}) => {
  const [error, setError] = React.useState<null | String>(null);
  const [loading, setLoading] = React.useState(false);
  const token = useUser((state) => state.token);
  const [messageAPI, contextHolder] = message.useMessage();

  const handleFinish = async (body: any) => {
    try {
      setError(null);
      setLoading(true);
      await inscribirJugador(id ,token!, body);
      messageAPI.success('Jugador inscripto con exito');
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
    handleFinish

  }
};

export default useInscripcion