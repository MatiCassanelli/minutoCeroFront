import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Partido} from '../app/models/partido';

@Injectable()
export class ReservaService {

  private api = global.serverURL + '/reservas/';

  constructor(private http: HttpClient) {
  }

  createReserva(reserva) {
    console.log(reserva);
    return this.http.post<any>(this.api, reserva, global.httpOptions);
  }

  // getPartidos(estado) {
  //   return this.http.get<Array<Partido>>(this.api + '/estado/' + estado, global.httpOptions);
  // }
  //
  // getPartido(id) {
  //   return this.http.get<Partido>(this.api + id, global.httpOptions);
  // }

}