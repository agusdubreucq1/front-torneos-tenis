/// <reference types="vite/client" />
export interface Tournament {
  id: number;
  cant_jugadores?: number | null;
  nombre: string;
  estado: "ABIERTO" | "COMPLETADO" | "SUSPENDIDO";
  descripcion?: null | string;
  fecha: string;
  lugar?: string | null;
  categoria: string;
  users: User[];
}

export type User = {
  nombre: string;
  apellido: string;
  dni: number;
};

export type Jugador = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user?: User;
};

// de partidos
export type Partido = {
  id: number;
  orden: number;
  resultado: string;
  ronda: string;
  fecha: string;
  ganador: null | User;
  createdAt: string;
  Pareja1: Pareja;
  Pareja2: Pareja;
  Ganador: null;
  jugadoresXRonda: number;
};

export type Pareja = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
  user: User;
};

export interface PartidoToBack {
  resultado: string | null,
  ronda: string | null,
  jugadoresXRonda: number //multiplo de 2,
  fecha: string | null//aaaa-mm-dd o dd-mm-aaaa,
  pareja1: number //id de un jugador,
  pareja2: number //id de un jugador,
  ganador: number | null //id de un jugador,
  orden: number // 0<number<jugadoresXRonda
}
