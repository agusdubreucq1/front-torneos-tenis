import React, { useEffect } from 'react';
import { useUser } from '../store/user';
import { URLBACK } from '../constantes';


const useCreateTournament = () => {
    const [token, getToken] = useUser((state) => [state.token, state.getToken])
    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        getToken();
    }, [])

    const handleSubmit = async (body: any) => {
        console.log(body)
        setError(null)

        try {
            setLoading(true)
            const resultado = await fetch(URLBACK + '/admin/torneo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ?? '',
                },
                body: JSON.stringify(body),
            })
            if (!resultado.ok) {
                let json = await resultado.json();
                json.message ? setError(json.message) : setError(json.error);
                console.log(json)
            }
        }
        catch (e) {
            console.log(e);
            setError('Error de conexion')
        } finally {
            setLoading(false)
        }

    }

    return {
        error,
        loading,
        handleSubmit
    }
};

export default useCreateTournament