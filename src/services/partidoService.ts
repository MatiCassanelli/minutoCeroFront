import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Partido} from '../app/models/partido';

@Injectable()
export class PartidoService {

  private api = global.serverURL + '/partido/';

  constructor(private http: HttpClient) {
  }

  createPartido(partido) {
    console.log(partido);
    return this.http.post<Partido>(this.api, partido, global.httpOptions);
  }

  getPartidos(estado) {
    return this.http.get<Array<Partido>>(this.api + estado, global.httpOptions);
  }

  getPartido(id) {
    return this.http.get<Partido>(this.api + id, global.httpOptions);
  }

}
