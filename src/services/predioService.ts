import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Predio} from '../app/models/predio';

@Injectable()
export class PredioService {

  private api = global.serverURL + '/predio/';

  constructor(private http: HttpClient) {
  }

  createPredio(predio) {
    return this.http.post<Predio>(this.api + 'crear', predio, global.httpOptions);
  }

  setUbicacion(predio, ub) {
    console.log(ub);
    return this.http.put<Predio>(this.api + predio + '/ubicacion', ub, global.httpOptions);
  }

  getAllPredios() {
    return this.http.get<Array<Predio>>(this.api + '/all', global.httpOptions);
  }

  getCanchas(idPredio) {
    return this.http.get(this.api + idPredio + '/canchas', global.httpOptions);
  }
}
