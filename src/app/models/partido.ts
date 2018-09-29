import {Jugador} from './jugador';
import {Plantel} from './plantel';
import {Deporte} from './deporte';

export class Partido {
  _id: string;
  deporte: Deporte;
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
