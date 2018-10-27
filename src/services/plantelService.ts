import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Plantel} from '../app/models/plantel';
import {environment} from "../environments/environment";

@Injectable()
export class PlantelService {

  private api = environment.baseUrl + '/plantel/';

  constructor(private http: HttpClient) {
  }

  getPlantel(idPlantel) {
    return this.http.get<Plantel>(this.api + idPlantel, global.httpOptions);
  }

  createPlantel(jugadoresConfirmados, localidad, cantMaximaJugadores) {
    // return this.http.post<Plantel>(this.api, {
    //   'jugadoresConfirmados': plantel.jugadoresConfirmados,
    //   'jugadores': plantel.jugadores,
    //   'localidad': localidad,
    //   'cantMaximaJugadores': cantMaximaJugadores
    // }, global.httpOptions);
    return this.http.post<Plantel>(this.api, {
      'jugadoresConfirmados': jugadoresConfirmados,
      'localidad': localidad,
      'cantMaximaJugadores': cantMaximaJugadores
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
