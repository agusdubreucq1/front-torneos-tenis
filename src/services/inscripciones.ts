import { URLBACK } from "../constantes";
import { InscripcionesOfJugador, InscripcionesOfTournament, Player, Tournament } from "../vite-env";

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

export const getInscripcionesByJugador = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/jugador/${id}/inscripciones`);
    const data = await response.json() as InscripcionesOfJugador;
    if (!response.ok) {
        throw new Error('Error al encontrar las inscripciones');
    }

    return data?.torneos as Tournament[];
}

export const getJugadoresNoInscriptos = async (id: number | string) => {
    const response = await fetch(`${URLBACK}/admin/torneo/${id}/jugadoresNoInscriptos`);
    if(!response.ok) {
        throw new Error('Error al encontrar los jugadores');
    }
    const data = await response.json();
    return data as Player[];
}

export const getInscripciones = async (id: string | number) => {
    const response = await fetch(`${URLBACK}/admin/torneo/${id}/inscripciones`);
    if (!response.ok) {
        throw new Error('Error al encontrar las inscripciones');
    }
    const data = await response.json();
    return data as InscripcionesOfTournament;
};

export const autoInscribirse = async (id: string | number, token: string) => {
    const response = await fetch(`${URLBACK}/admin/torneo/${id}/autoInscripcion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        if(response.status === 403) {
            throw new Error("No tienes permiso para inscribir");
        }
        throw new Error("Error al inscribir al jugador");
    }
    
    return data;
}