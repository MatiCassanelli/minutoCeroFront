import {Jugador} from './jugador';

export class Equipo {
  _id: string;
  nombre: string;
  deporte: string;
  capitan: string;
  // jugadores: Jugador;
  jugadores: Array<Jugador>;
}
