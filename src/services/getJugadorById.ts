import { URLBACK } from "../constantes";

export const getJugadorById = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/jugador/${id}`);
    if (!response.ok) {
        throw new Error('Error al encontrar el jugador');
    }
    const data = await response.json();
    return data;
}