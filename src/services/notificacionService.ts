import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';
import {Predio} from '../app/models/predio';

@Injectable()
export class NotificacionService {
  private api = global.serverURL + '/notificaciones/';

  constructor(private http: HttpClient) {
  }

  getNotificaciones() {
    return this.http.get<Array<any>>(this.api + '/nuevas', global.httpOptions);
  }

  getCantNotificaciones() {
    return this.http.get<number>(this.api + '/nuevas/cantidad', global.httpOptions);
  }
}
