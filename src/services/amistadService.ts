import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';
import {environment} from '../environments/environment';

@Injectable()
export class AmistadService {

  private api = environment.baseUrl + '/amigo/';

  constructor(private http: HttpClient) {
  }

  enviarSolicitud(id) {
    return this.http.post<any>(this.api + 'invitar/' + id, null, global.httpOptions);
    // return this.http.get<any>(this.api, global.httpOptions);
  }

  getAmigos() {
    return this.http.get<Array<Jugador>>(this.api, global.httpOptions);
  }

  eliminarAmigo(idAmigo) {
    return this.http.delete(this.api + idAmigo, global.httpOptions);
  }
}
