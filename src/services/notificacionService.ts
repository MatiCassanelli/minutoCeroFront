import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';
import {Predio} from '../app/models/predio';
import {environment} from '../environments/environment';

@Injectable()
export class NotificacionService {
  private api = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getNotificaciones() {
    return this.http.get<Array<any>>(this.api + '/notificaciones/' + 'nuevas', global.httpOptions);
  }

  getCantNotificaciones() {
    return this.http.get<number>(this.api + '/notificaciones/' + 'nuevas/cantidad', global.httpOptions);
  }

  responder(id, tipoNotificacion, respuesta) {
    return this.http.put<any>(this.api + '/solicitudes/' + tipoNotificacion + '/' + id, {respuesta: respuesta}, global.httpOptions);
  }

  getSolicitudEnviada(idSolicitado) {
    return this.http.get<any>(this.api + '/solicitudes/amistad/enviada/' + idSolicitado, global.httpOptions);
  }

  getSolicitudRecibida(idSolicitante) {
    return this.http.get<any>(this.api + '/solicitudes/amistad/recibida/' + idSolicitante, global.httpOptions);
  }

  cancelarSolicitud(idSolicitud) {
    return this.http.delete(this.api + '/solicitudes/' + idSolicitud, global.httpOptions);
  }

  updateNotificacion(id) {
    return this.http.put<any>(this.api + '/notificaciones/' + id, null, global.httpOptions);
  }
}
