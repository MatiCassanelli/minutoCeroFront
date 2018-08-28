import {Jugador} from './jugador';

export class Partido {
  id: string;
  deporte: string;
  grupoLocal: string;
  grupoVisitante: string;
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
