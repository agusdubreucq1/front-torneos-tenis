import { URLBACK } from "../constantes";

interface User {
    dni: number | string,
    password: string
}

export const login = async (body:User) => {
    const response = await fetch(URLBACK + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.error);
    }
    return result;
}

export const register = async (body: any) => {
    const response = await fetch(URLBACK + '/register' ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    if (!response.ok) {
        throw {message: data.error}
        // throw new Error(data.error)
    }
    return data
}