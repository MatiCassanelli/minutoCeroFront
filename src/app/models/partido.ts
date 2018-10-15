import {Jugador} from './jugador';
import {Plantel} from './plantel';
import {Deporte} from './deporte';
import {Cancha} from './cancha';

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
  cancha: Cancha;
  organizador: Jugador;
  estado: string;
  horasDeJuego: number;
  resultado: {
    golesLocal: number,
    golesVisitante: number
  };
}
