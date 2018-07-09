import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {Jugador} from '../app/models/jugador';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class JugadorService {
  private api = 'http://localhost:3000/jugador/';

  constructor(private http: HttpClient) {
  }

  getJugadores(nombre: any = null) {
    if (nombre === null) {
      return this.http.get<Array<Jugador>>(this.api);
    } else {
      return this.http.get<Array<Jugador>>(this.api + 'buscar/' + nombre);
    }
  }


}
