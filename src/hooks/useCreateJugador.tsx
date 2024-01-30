import React from 'react';
import { useUser } from '../store/user';
import { message } from 'antd';
import { createJugador } from '../services/Jugador';

const useCreateJugador = () => {
    const [messageAPI, contextHolder] = message.useMessage();

    const token = useUser((state) => state.token);
    const [error, setError] = React.useState<null | string>(null);
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (body: any) => {
        setError(null);
        try {
            setLoading(true);
            await createJugador(body, token!) 
            messageAPI.success('Jugador creado con exito');
            
        } catch (e:any) {
            if(e.name === 'Error'){
                setError(e.message);
            } else {
                setError('Error de conexion');
            }
        } finally {
            setLoading(false);
        }

    }

    return {
        onFinish,
        error,
        loading,
        contextHolder
    }
};

export default useCreateJugador;