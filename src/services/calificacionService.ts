import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';
import {Predio} from '../app/models/predio';
import {environment} from "../environments/environment";

@Injectable()
export class CalificacionService {
  private api = environment.baseUrl + '/calificacion/';

  constructor(private http: HttpClient) {
  }

  getJugadoresPorClasificar() {
    return this.http.get<Array<Jugador>>(this.api + 'jugadores', global.httpOptions);
  }

  getPrediosPorClasificar() {
    return this.http.get<Array<Predio>>(this.api + 'predios', global.httpOptions);
  }

  putCalificacionJugador(calificacion, jugador) {
    return this.http.put<Jugador>(this.api + 'jugador/' + jugador, calificacion, global.httpOptions);
  }
  putCalificacionPredio(calificacion, jugador) {
    return this.http.put<Predio>(this.api + 'predio/' + jugador, calificacion, global.httpOptions);
  }
}
