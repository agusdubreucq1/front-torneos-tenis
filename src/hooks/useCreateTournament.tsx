import React, { useEffect } from 'react';
import { useUser } from '../store/user';
import { createTournament } from '../services/tournament';
import { message } from 'antd';
import { useTournaments } from '../store/tournaments';


const useCreateTournament = () => {
    const [token, getToken] = useUser((state) => [state.token, state.getToken])
    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);
    const [messageAPI, contextHolder] = message.useMessage();
    const getTournaments = useTournaments((state) => state.getTournaments);


    useEffect(() => {
        getToken();
    }, [])

    const handleSubmit = async (body: any) => {
        setError(null)

        try {
            setLoading(true)
            await createTournament(body, token!)
            messageAPI.success('Torneo creado con exito');
            getTournaments();
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