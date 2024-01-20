import { URLBACK } from "../constantes";

export const getPartidosByJugador = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/jugador/${id}/partidos`);
    const data = await response.json();
    if (!response.ok) {
        console.log(data);
        throw new Error("Error al encontrar los partidos");
    }
    
    return data;
}