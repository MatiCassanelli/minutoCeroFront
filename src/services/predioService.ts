import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from '../app/app.global';

import {Predio} from '../app/models/predio';
import {Equipo} from '../app/models/equipo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class PredioService {

  private api = global.serverURL + '/predio/';

  constructor(private http: HttpClient) {
  }

  createPredio(predio) {
    return this.http.post<Predio>(this.api + 'crear', predio);
  }
}
