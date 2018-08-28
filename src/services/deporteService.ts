import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from '../app/app.global';
import {Deporte} from '../app/models/deporte';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};


@Injectable()
export class DeporteService {
  private api = global.serverURL + '/deporte/';

  constructor(private http: HttpClient) {
  }

  getDeportes() {
    return this.http.get<Array<Deporte>>(this.api, httpOptions);
  }
}
