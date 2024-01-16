import { URLBACK } from "../constantes"

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