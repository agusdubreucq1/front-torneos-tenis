import { URLBACK } from "../constantes"
import { Player, Match } from "../vite-env";

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


export const getPartidosByJugador = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/jugador/${id}/partidos`);
    const data = await response.json();
    if (!response.ok) {
        console.log(data);
        throw new Error("Error al encontrar los partidos");
    }
    
    return data as Match[];
}

export const getJugadorById = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/jugador/${id}`);
    if (!response.ok) {
        throw new Error('Error al encontrar el jugador');
    }
    const data = await response.json();
    return data as Player;
}

export const getJugadores = async () => {
    const response = await fetch(URLBACK + '/admin/jugador');
    if (!response.ok) {
        throw new Error('Error al encontrar los jugadores');
    }
    const data = await response.json();
    return data as Player[];
}
