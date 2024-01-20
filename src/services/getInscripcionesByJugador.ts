import { URLBACK } from "../constantes";

export const getInscripcionesByJugador = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/jugador/${id}/inscripciones`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Error al encontrar las inscripciones');
    }

    return data?.torneos;
}