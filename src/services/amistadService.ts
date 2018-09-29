import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';

@Injectable()
export class AmistadService {

  private api = global.serverURL + '/amigo/';

  constructor(private http: HttpClient) {
  }

  enviarSolicitud(id) {
    return this.http.post<any>(this.api + 'invitar/' + id, null, global.httpOptions);
    // return this.http.get<any>(this.api, global.httpOptions);
  }
}
