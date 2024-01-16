import { URLBACK } from "../constantes";

export const inscribirJugador = async (id: string | number, token: string, body: any) => {
    const response = await fetch(`${URLBACK}/admin/torneo/${id}/inscripciones`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        if(response.status === 403) {
            throw new Error("No tienes permiso para inscribir");
        }
        throw new Error("Error al inscribir al jugador");
    }
    const data = await response.json();
    return data;
}