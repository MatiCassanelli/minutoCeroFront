import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {environment} from "../environments/environment";
import {Partido} from '../app/models/partido';

@Injectable()
export class ReservaService {

  private api = environment.baseUrl + '/reservas/';

  constructor(private http: HttpClient) {
  }

  createReserva(reserva) {
    console.log(reserva);
    return this.http.post<any>(this.api, reserva, global.httpOptions);
  }

  getReservaById (idReserva) {
    return this.http.get<any>(this.api + idReserva, global.httpOptions);
  }

  getAllReservas() {
    return this.http.get<any>(this.api + 'all', global.httpOptions);
  }

  getNotificacionesReserva() {
    return this.http.get<any>(this.api + 'notificaciones', global.httpOptions);
  }

  putEstado(idReserva, estado) {
    return this.http.put<any>(this.api + idReserva + '/estado', {estado: estado}, global.httpOptions);
  }

}
