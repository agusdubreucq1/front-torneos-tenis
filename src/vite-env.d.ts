/// <reference types="vite/client" />
export interface Tournament {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  estado: string;
  categoria: string;
  cant_jugadores? : number;
  users: User[];
}

export type User = {
  nombre:   string;
  apellido: string;
  dni:      number;
}

export type Jugador = {
  id:        number;
  createdAt: Date;
  updatedAt: Date;
  userId:    number;
  user?:      User;
}


// de partidos
export type Partido = {
  id:        number;
  orden:     number;
  resultado: string;
  ronda:     string;
  fecha:     string;
  ganador:   null | User;
  createdAt: Date;
  Pareja1:   Pareja;
  Pareja2:   Pareja;
  Ganador:   null;
  jugadoresXRonda: number
}

export type Pareja = {
  id:        number;
  createdAt: Date;
  updatedAt: Date;
  userId:    number;
  user:      User;
}



