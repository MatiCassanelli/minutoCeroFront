import {Jugador} from './jugador';

export class Plantel {
  _id: string;
  jugadoresConfirmados: Array<Jugador>;
  jugadores: Array<Jugador>;

  constructor(id = null) {
    if (id)
      this._id = id;
    this.jugadores = new Array<Jugador>();
    this.jugadoresConfirmados = new Array<Jugador>();
  }
}
