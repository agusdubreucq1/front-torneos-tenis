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
    const data = await response.json();
    if (!response.ok) {
        if(response.status === 403) {
            throw new Error("No tienes permiso para inscribir");
        }
        console.log(data)
        throw new Error("Error al inscribir al jugador");
    }
    
    return data;
}