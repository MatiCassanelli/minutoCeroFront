import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';

@Injectable()
export class JugadorService {

  private api = global.serverURL + '/jugador/';

  constructor(private http: HttpClient) {
  }

  getJugadores(nombre: any = null) {
    if (nombre === null) {
      return this.http.get<Array<Jugador>>(this.api, global.httpOptions);
    } else {
      return this.http.get<Array<Jugador>>(this.api + 'buscar/' + nombre, global.httpOptions);
    }
  }

  getJugadorById(id: string) {
    return this.http.get<Jugador>(this.api + id, global.httpOptions);
  }


}
