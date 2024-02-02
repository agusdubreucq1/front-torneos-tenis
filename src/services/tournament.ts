import { URLBACK } from "../constantes";
import { Tournament } from "../vite-env";

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

export const getTournaments = async () => {
    const response = await fetch(URLBACK + '/torneos');
    if (!response.ok) {
        throw new Error('Error al encontrar los torneos');
    }
    const data = await response.json();
    return data as Tournament[];
}


export const getTournamentsByUser = async (token: string) => {
    const response = await fetch(URLBACK + '/admin/torneo/user', {
        headers: {
            Authorization: token!
        }
    })
    if (!response.ok) {
        throw new Error('Error al encontrar los torneos');
    }
    const data = await response.json();
    return data as Tournament[];
}
