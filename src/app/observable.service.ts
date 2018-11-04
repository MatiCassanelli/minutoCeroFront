import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ObservableService {

  private equipo$ = new Subject<any>();
  private notificaciones$ = new Subject<any>();
  private messageSource = new BehaviorSubject(1);
  currentMessage = this.messageSource.asObservable();

  constructor() {}
  tieneEquipo(data: boolean) {
    this.equipo$.next({ equipo: data });
  }

  setCantidadNotificaciones(cant: number) {
    this.notificaciones$.next({ cantidadNotificaciones: cant });
  }

  getTieneEquipo(): Observable<any> {
    return this.equipo$.asObservable();
  }

  getCantNotificaciones(): Observable<any> {
    return this.notificaciones$.asObservable();
  }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

}
