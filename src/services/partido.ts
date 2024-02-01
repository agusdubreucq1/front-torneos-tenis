import { URLBACK } from "../constantes";
import { Match } from "../vite-env";

export const createPartido = async (body: any, token: string, id: string | number) => {
  const response = await fetch(URLBACK + "/admin/torneo/" + id + "/partidos", {
    headers: {
      Authorization: token!,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error("Error al crear el partido");
  }

  return data;
};

export const getPartidosByTorneo = async (id: string | number) => {
  const response = await fetch(`${URLBACK}/admin/torneo/${id}/partidos`);
  if (!response.ok) {
    throw new Error("Error al encontrar los partidos");
  }
  const data = await response.json();
  return data as Match[];
};

export const updateMatch = async (id: (string | number), body: any, token: string) => {
  console.log('id en services', id);
  const response = await fetch(`${URLBACK}/admin/torneo/partidos/${id}`, {
    headers: {
      Authorization: token!,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }

  return data as Match;
};

export const getMatchById = async (id: string | number) => {
  const response = await fetch(`${URLBACK}/admin/torneo/partidos/${id}`);
  if (!response.ok) {
    throw new Error("Error al encontrar el partido");
  }
  const data = await response.json();
  return data as Match;
};

export const deleteMatch = async (id: string | number, token: string) => {
  const response = await fetch(`${URLBACK}/admin/torneo/partidos/${id}`, {
    headers: {
      Authorization: token!,
    },
    method: "DELETE"
  })
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al eliminar el partido");
  }
  
  return data
}
