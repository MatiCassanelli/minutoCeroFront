import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ObservableService {

  private dataObs$ = new Subject<any>();

  tieneEquipo(data: boolean) {
    this.dataObs$.next({ data: data });
  }

  setCantidadNotificaciones(cant: number) {
    this.dataObs$.next({ cantidadNotificaciones: cant });
  }

  getData(): Observable<any> {
    return this.dataObs$.asObservable();
  }

}
