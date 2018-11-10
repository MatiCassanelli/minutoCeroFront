import {Jugador} from './jugador';
import {Cancha} from './cancha';

export class Reserva {
  _id: string;
  dia: Date;
  cancha: Cancha;
  jugador: Jugador;
  jugadorNoRegistrado: {
    nombre: string,
    apellido: string,
    telefono: string
  };
  estado: string;
}
