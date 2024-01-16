import { URLBACK } from "../constantes"

export const getInscripciones = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/torneo/${id}/inscripciones`);
    if (!response.ok) {
        throw new Error('Error al encontrar las inscripciones');
    }
    const data = await response.json();
    return data;
};