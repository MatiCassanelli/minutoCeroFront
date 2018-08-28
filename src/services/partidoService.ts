import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from '../app/app.global';
import {Plantel} from '../app/models/plantel';
import {Partido} from '../app/models/partido';
import {Equipo} from '../app/models/equipo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};


@Injectable()
export class PartidoService {

  private api = global.serverURL + '/partido/';

  constructor(private http: HttpClient) {
  }

  createPartido(partido) {
    console.log(partido);
    return this.http.post<Partido>(this.api, partido, httpOptions);
  }

  getPartidos(estado) {
    return this.http.get<Array<Partido>>(this.api + estado, httpOptions);
  }

}
