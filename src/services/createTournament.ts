import { URLBACK } from "../constantes";

export const createTournament = async (body: any, token: string) => {
    const response = await fetch(URLBACK + '/admin/torneo', {
        headers: {
            Authorization: token!,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error('Error al crear el torneo');
    }
    const data = await response.json();
    return data;
}

