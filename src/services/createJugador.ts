import { URLBACK } from "../constantes"

export const createJugador = async (body: any, token: string) => {
    const response = await fetch(URLBACK + '/admin/jugador', {
        headers: {
            Authorization: token!,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)

    })
    if (!response.ok) {
        throw new Error('Error al crear el jugador');
    }
    const data = await response.json();
    return data;
}

