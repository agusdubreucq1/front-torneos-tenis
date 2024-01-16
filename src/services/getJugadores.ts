import { URLBACK } from "../constantes";

export const getJugadores = async () => {
    const response = await fetch(URLBACK + '/admin/jugador');
    if (!response.ok) {
        throw new Error('Error al encontrar los jugadores');
    }
    const data = await response.json();
    return data;
}