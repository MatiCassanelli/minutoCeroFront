import {Jugador} from './jugador';

export class Plantel {
  id: string;
  jugadoresConfirmados: Jugador[];
  jugadores: Jugador[];

  constructor(id){
    this.id = id;
    this.jugadores = [];
    this.jugadoresConfirmados = [];
  }
}
