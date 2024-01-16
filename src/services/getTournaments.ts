import { URLBACK } from "../constantes";

export const getTournaments = async () => {
    const response = await fetch(URLBACK + '/torneos');
    if (!response.ok) {
        throw new Error('Error al encontrar los torneos');
    }
    const data = await response.json();
    return data;
}