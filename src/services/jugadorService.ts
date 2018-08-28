import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};


@Injectable()
export class JugadorService {

  private api = global.serverURL + '/jugador/';

  constructor(private http: HttpClient) {
  }

  getJugadores(nombre: any = null) {
    if (nombre === null) {
      return this.http.get<Array<Jugador>>(this.api, httpOptions);
    } else {
      return this.http.get<Array<Jugador>>(this.api + 'buscar/' + nombre, httpOptions);
    }
  }

  getJugadorById(id: string) {
    return this.http.get<Jugador>(this.api + id, httpOptions);
  }


}
