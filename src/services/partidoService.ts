import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Partido} from '../app/models/partido';
import {environment} from "../environments/environment";

@Injectable()
export class PartidoService {

  private api = environment.baseUrl + '/partido/';

  constructor(private http: HttpClient) {
  }

  createPartido(partido) {
    return this.http.post<Partido>(this.api, partido, global.httpOptions);
  }

  getPartidos(estado) {
    return this.http.get<Array<Partido>>(this.api + '/estado/' + estado, global.httpOptions);
  }

  getPartido(id) {
    return this.http.get<Partido>(this.api + id, global.httpOptions);
  }

  updateResultado(idPartido, resultado) {
    return this.http.put<Partido>(this.api + 'resultado/' + idPartido, resultado, global.httpOptions);
  }

}
