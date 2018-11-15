import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ObservableService {

  private equipo$ = new Subject<any>();
  private messageSource = new BehaviorSubject(1);
  private logueado = new Subject<boolean>();
  cantNotificaciones = this.messageSource.asObservable();
  usuarioLogueado = this.logueado.asObservable();

  constructor() {}
  tieneEquipo(data: boolean) {
    this.equipo$.next({ equipo: data });
  }

  getTieneEquipo(): Observable<any> {
    return this.equipo$.asObservable();
  }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  loguear(asd: boolean) {
    this.logueado.next(asd);
  }

}
