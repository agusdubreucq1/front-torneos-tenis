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

export interface User {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
}
