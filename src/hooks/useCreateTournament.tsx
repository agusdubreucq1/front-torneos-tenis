import React, { useEffect } from 'react';
import { useUser } from '../store/user';
import { URLBACK } from '../constantes';

type Errores_campos = {
    [key: string]: string | null
}
 type Body= {
    nombre: FormDataEntryValue | null;
    fecha: FormDataEntryValue | null;
    lugar: FormDataEntryValue | null;
    categoria: FormDataEntryValue | null;
    cant_jugadores: FormDataEntryValue | null;
}

const validacion_form = (body: Body)=>{
    if (body.nombre == '' || body.fecha == '' || body.categoria == '') {
        let newErrores_campos: Errores_campos = {
            nombre: null,
            fecha: null,
            lugar: null,
            categoria: null,
            cant_jugadores: null
        }
        if (body.nombre == '') {
            newErrores_campos = {
                ...newErrores_campos,
                nombre: 'El nombre es requerido'
            }
        }
        if (body.fecha == '') {
            newErrores_campos = {
                ...newErrores_campos,
                fecha: 'La fecha es requerida'
            }
        }
        if (body.categoria == '') {
            newErrores_campos = {
                ...newErrores_campos,
                categoria: 'La categoria es requerida'
            }
        }
        return newErrores_campos
    }else{
        return undefined
    }
}

const useCreateTournament = () => {
    const [token, getToken] = useUser((state) => [state.token, state.getToken])
    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);

    const [errores_campos, setErrores_campos] = React.useState<Errores_campos>({
        nombre: null,
        fecha: null,
        lugar: null,
        categoria: null,
        cant_jugadores: null
    });

    useEffect(() => {
        getToken();
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null)

        const data = new FormData(event.currentTarget);
        const body = {
            nombre: data.get('nombre'),
            fecha: data.get('fecha'),
            lugar: data.get('lugar'),
            categoria: data.get('categoria'),
            cant_jugadores: (data.get('cant_jugadores') == '0' ? null : data.get('cant_jugadores'))
        }
        if(validacion_form(body) !== undefined){
            setErrores_campos({ ...validacion_form(body) })
            return
        }

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
        errores_campos,
        handleSubmit
    }
};

export default useCreateTournament