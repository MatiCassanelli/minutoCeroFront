import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import * as global from '../../app.global';

import {environment} from '../../../environments/environment';
import {EquipoService} from '../../../services/equipoService';
import {ObservableService} from '../../observable.service';

// import {UsuarioService} from '../../_services/usuario.service';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css'],
  providers: [BreakpointObserver, MediaMatcher]
})
export class HeaderViewComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') sidenav: MatSidenav;

  @Input() tipoJugador: string;

  // @Input() cantidad: number;
  @Input() cantidad: number;
  @Output() restarNotificaciones: EventEmitter<boolean> = new EventEmitter<boolean>();
  tieneEquipo: boolean;
  subscription: Subscription;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  logoutApi = environment.baseUrl + '/auth/logout';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private authService: AuthService,
              private equipoService: EquipoService,
              private observableService: ObservableService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.subscription = this.observableService.getTieneEquipo().subscribe(data => {
      this.tieneEquipo = data.equipo;
    });
    this.observableService.cantNotificaciones.subscribe(res => {
      this.cantidad = res;
    });
  }

  logOut() {
    this.authService.logOut();
    window.location.href = this.logoutApi;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    console.log('destroying');
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.equipoService.getMiEquipo().subscribe(res => {
      if (res) {
        this.observableService.tieneEquipo(true);
      } else {
        this.observableService.tieneEquipo(false);
      }
    });
    // this.observableService.cantNotificaciones.subscribe(res => {
    //   this.cantidad = res;
    // });
  }

  restarNotificacion() {
    this.restarNotificaciones.emit(true);
  }

}
