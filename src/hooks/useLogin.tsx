import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/user';
import { login } from '../services/login';

export const useLogin = () => {
    const setUser = useUser((state) => state.setUser);
    const navigate = useNavigate();

    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (body: any) => {
        console.log(body)
        try {
            setError(null)
            setLoading(true)
            const result = await login(body)
            console.log(result);
            setUser(result.user);
            navigate('/')    
        } catch (e:any) {
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
        handleSubmit
    }
};

export default name