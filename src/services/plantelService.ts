import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from "../app/app.global";
import {Plantel} from "../app/models/plantel";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":'application/json'
  }),
  withCredentials: true
};


@Injectable()
export class PlantelService {

  private api = global.serverURL + '/plantel/';

  constructor(private http: HttpClient) {
  }

  getPlantel(idPlantel) {
    return this.http.get<Plantel>(this.api + idPlantel, httpOptions);
  }

  addJugadorConfirmado(idPlantel, idJugador){
    return this.http.put<Plantel>(this.api + idPlantel, {
      'jugadoresConfirmados':[idJugador]
    }, httpOptions)
  }

}
