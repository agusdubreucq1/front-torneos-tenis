import React, { useEffect } from 'react';
import { useUser } from '../store/user';
import { createTournament } from '../services/createTournament';
import { message } from 'antd';


const useCreateTournament = () => {
    const [token, getToken] = useUser((state) => [state.token, state.getToken])
    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);
    const [messageAPI, contextHolder] = message.useMessage();


    useEffect(() => {
        getToken();
    }, [])

    const handleSubmit = async (body: any) => {
        console.log(body)
        setError(null)

        try {
            setLoading(true)
            await createTournament(body, token!)
            messageAPI.success('Torneo creado con exito');
        }
        catch (e: any) {
            if (e.name === 'Error') {
                setError(e.message)
            } else {
                setError('Error de conexion')
            }
        } finally {
            setLoading(false)
        }

    }

    return {
        error,
        loading,
        handleSubmit,
        contextHolder
    }
};

export default useCreateTournament