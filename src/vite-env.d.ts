/// <reference types="vite/client" />
export interface Tournament {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  estado: string;
  categoria: string;
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


