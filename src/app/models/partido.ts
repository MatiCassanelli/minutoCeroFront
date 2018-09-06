import {Jugador} from './jugador';
import {Plantel} from './plantel';

export class Partido {
  _id: string;
  deporte: string;
  grupoLocal: Plantel;
  grupoVisitante: Plantel;
  dia: Date;
  // hora: {
  //     type: Date,
  //     required: true
  // },
  cancha: string;
  organizador: Jugador;
  estado: string;
  horasDeJuego: number;
}
