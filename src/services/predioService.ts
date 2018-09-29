import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Predio} from '../app/models/predio';
import {environment} from "../environments/environment";

@Injectable()
export class PredioService {

  private api = environment.baseUrl + '/predio/';

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
    return this.http.get<Array<Predio>>(this.api + 'all', global.httpOptions);
  }

  getCanchasWithPredio(idPredio) {
    return this.http.get(this.api + idPredio + '/canchas', global.httpOptions);
  }
  getCanchas() {
    return this.http.get(this.api + 'canchas', global.httpOptions);
  }

  getPredio(idPredio) {
    return this.http.get<Predio>(this.api + idPredio + '/info', global.httpOptions);
  }
}
