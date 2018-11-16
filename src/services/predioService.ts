import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as global from '../app/app.global';
import {Predio} from '../app/models/predio';
import {environment} from '../environments/environment';
import {Cancha} from '../app/models/cancha';

@Injectable()
export class PredioService {

  private api = environment.baseUrl + '/predio/';

  constructor(private http: HttpClient) {
  }

  createPredio(predio, step = null) {
    return this.http.put<Predio>(this.api + 'crear', predio, global.httpOptions);
  }

  setUbicacion(ub, step = null) {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + ub.lat + ',' + ub.lng + '&key=AIzaSyBsn7tFiyBEzol0JCAYmoqfBb1IjVvMVuI')
      .subscribe(res => {
        ub = {
          lat: ub.lat,
          lng: ub.lng,
          direccion: res['results'][0].formatted_address
        };
        this.http.put<Predio>(this.api + 'ubicacion', {ubicacion: ub, step: step}, global.httpOptions).subscribe(respredio => {
          return respredio;
        });
      });
  }

  setCanchas(canchas, step = null) {
    return this.http.post<Predio>(this.api + 'canchas/crear', {canchas: canchas, step: step}, global.httpOptions);
  }

  setConfiguracionHorarios(horarios, step = null) {
    return this.http.put<Predio>(this.api + 'configuracionDiaNoche', {configHorario: horarios, step: step}, global.httpOptions);
  }

  setHorarios(horarios, step = null) {
    return this.http.put<Predio>(this.api + 'horario', {horario: horarios, step: step}, global.httpOptions);
  }

  updateStep(step) {
    return this.http.put<Predio>(this.api + '/step/' + step, null, global.httpOptions);
  }

  getPredioConDisponibilidad(idDeporte, kilometros, lat, lng, dia) {
    return this.http.get<any>(this.api + '/cercanos/idDeporte=' + idDeporte + '&kilometros=' + kilometros + '&longitud=' + lng + '&latitud=' +
      lat + '&dia=' + dia, global.httpOptions);
  }

  getAllPredios() {
    return this.http.get<Array<Predio>>(this.api + 'all', global.httpOptions);
  }

  getCanchasWithPredio(idPredio) {
    return this.http.get<Array<Cancha>>(this.api + idPredio + '/canchas', global.httpOptions);
  }

  getCanchas() {
    return this.http.get<Array<Cancha>>(this.api + 'canchas', global.httpOptions);
  }

  getPredio(idPredio) {
    return this.http.get<Predio>(this.api + idPredio + '/info', global.httpOptions);
  }

}
