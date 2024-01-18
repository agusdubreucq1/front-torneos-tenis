import { URLBACK } from "../constantes";

export const getJugadoresNoInscriptos = async (id: number | string) => {
    const response = await fetch(`${URLBACK}/admin/torneo/${id}/jugadoresNoInscriptos`);
    if(!response.ok) {
        throw new Error('Error al encontrar los jugadores');
    }
    const data = await response.json();
    return data;
}