import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/login';
import { valueType } from 'antd/es/statistic/utils';

interface UserRegister{
    nombre: string;
    apellido: string;
    dni: valueType | null;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
}

const useRegister = () => {
    const navigate = useNavigate();

    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);
    const [newUser, setNewUser] = React.useState<UserRegister>({
        nombre: '',
        apellido: '',
        dni: null,
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

    const handleChangeDNI = (value: valueType | null) => {
        setNewUser({
            ...newUser,
            dni: value
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
        handleChangeDNI,
        handleChangeSwitch,
        handleSubmit
    }
};

export default useRegister;