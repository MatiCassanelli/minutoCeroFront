import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as global from '../app/app.global';
import {Jugador} from '../app/models/jugador';
import {Predio} from '../app/models/predio';
import {environment} from '../environments/environment';
import {ResumenCuenta} from '../app/models/resumenCuenta';

@Injectable()
export class ResumenService {
  private api = environment.baseUrl + '/resumen';

  constructor(private http: HttpClient) {
  }

  getResumenes() {
    return this.http.get<Array<ResumenCuenta>>(this.api, global.httpOptions);
  }

  getResumenById(idResumen) {
    return this.http.get<ResumenCuenta>(this.api + /detalle/ + idResumen, global.httpOptions);
  }
}
