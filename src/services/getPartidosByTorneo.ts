import { URLBACK } from "../constantes";

export const getPartidosByTorneo = async (id: string | number) => {
  const response = await fetch(`${URLBACK}/admin/torneo/${id}/partidos`);
  if (!response.ok) {
    throw new Error("Error al encontrar los partidos");
  }
  const data = await response.json();
  return data;
};
