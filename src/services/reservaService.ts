import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {environment} from "../environments/environment";
import {Partido} from '../app/models/partido';
import {Reserva} from '../app/models/reserva';

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
    return this.http.get<Reserva>(this.api + idReserva, global.httpOptions);
  }

  getMisReservas() {
    return this.http.get<any>(this.api + 'misReservas', global.httpOptions);
  }

  getNotificacionesReserva() {
    return this.http.get<any>(this.api + 'notificaciones', global.httpOptions);
  }

  getCantNotificacionesReserva() {
    return this.http.get<number>(this.api + 'notificaciones/cantidad', global.httpOptions);
  }

  putEstado(idReserva, estado) {
    return this.http.put<any>(this.api + idReserva + '/estado', {estado: estado}, global.httpOptions);
  }

  getByEstado(estado) {
    return this.http.get<any>(this.api + '/estado/' + estado, global.httpOptions);
  }

  cancelarReserva(idReserva) {
    return this.http.delete(this.api + '/independiente/' + idReserva, global.httpOptions);
  }

  cancelarReservaPredio(idReserva) {
    return this.http.delete(this.api + '/predio/' + idReserva, global.httpOptions);
  }

  updateCancha(idReserva, idCancha) {
    return this.http.put<Reserva>(this.api + idReserva + '/ubicacion', {cancha: idCancha}, global.httpOptions);
  }
}
