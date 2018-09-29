import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Plantel} from '../app/models/plantel';

@Injectable()
export class PlantelService {

  private api = global.serverURL + '/plantel/';

  constructor(private http: HttpClient) {
  }

  getPlantel(idPlantel) {
    return this.http.get<Plantel>(this.api + idPlantel, global.httpOptions);
  }

  addJugadorConfirmado(idPlantel, idJugador) {
    return this.http.put<Plantel>(this.api + idPlantel + '/invitar', {
      'jugadoresConfirmados': [idJugador]
    }, global.httpOptions);
  }

  createPlantel(plantel, localidad) {
    return this.http.post<Plantel>(this.api, {
      'jugadoresConfirmados': plantel.jugadoresConfirmados,
      'jugadores': plantel.jugadores,
      'localidad': localidad
    }, global.httpOptions);
  }

  updatePlantel(idPlantel, jugadoresConfirmados = null, jugadores = null) {
    return this.http.put<Plantel>(this.api + idPlantel + '/invitar', {
      'jugadoresConfirmados': jugadoresConfirmados,
      'jugadores': jugadores
    }, global.httpOptions);
  }

  confirmarJugador(idPlantel, jugadorParaConfirmar) {
    return this.http.put<Plantel>(this.api + idPlantel, {
      'jugadoresConfirmados': jugadorParaConfirmar,
      'jugadores': jugadorParaConfirmar
    }, global.httpOptions);
  }

}
