import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/register';

const useRegister = () => {
    const navigate = useNavigate();

    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);
    const [newUser, setNewUser] = React.useState({
        nombre: '',
        apellido: '',
        dni: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeSwitch = (value: boolean) => {
        setNewUser({
            ...newUser,
            isAdmin: value
        })
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            setError(null)
            await register(newUser)
            navigate('/login');

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
        newUser,
        loading,
        handleChange,
        handleChangeSwitch,
        handleSubmit
    }
};

export default useRegister;