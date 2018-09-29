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

  addJugadorConfirmado(idPlantel, idJugador) {
    return this.http.put<Plantel>(this.api + idPlantel, {
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

  updatePlantel(plantel) {
    return this.http.put<Plantel>(this.api + plantel._id, {
      'jugadoresConfirmados': plantel.jugadoresConfirmados,
      'jugadores': plantel.jugadores
    }, global.httpOptions);
  }

}
