import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from '../app/app.global'
import {Jugador} from '../app/models/jugador';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class JugadorService {
<<<<<<< HEAD
  private api = global.serverURL + '/jugador/';
=======
  private api = 'http://192.168.0.172:3000/jugador/';
  // private api = 'http://192.168.100:3000/jugador/';
>>>>>>> cc11b42faff847b524e6b7fe0d73eda76b2f7186

  constructor(private http: HttpClient) {
  }

  getJugadores(nombre: any = null) {
    if (nombre === null) {
      return this.http.get<Array<Jugador>>(this.api);
    } else {
      return this.http.get<Array<Jugador>>(this.api + 'buscar/' + nombre);
    }
  }

  getJugadorById(id: string) {
    return this.http.get<Jugador>(this.api + id);
  }


}
