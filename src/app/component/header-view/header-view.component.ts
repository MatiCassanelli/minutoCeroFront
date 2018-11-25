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

  tipoJugador: string;
  titulo = 'Minuto Cero';

  // @Input() cantidad: number;
  @Input() cantidad: number;
  @Output() restarNotificaciones: EventEmitter<boolean> = new EventEmitter<boolean>();
  tieneEquipo: boolean;
  subscription: Subscription;
  mobileQuery: MediaQueryList;
  // height = window.innerHeight
  //   || document.documentElement.clientHeight
  //   || document.body.clientHeight;

  private _mobileQueryListener: () => void;
  logoutApi = environment.baseUrl + '/auth/logout';
  mostrarMenu: boolean;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private authService: AuthService,
              private equipoService: EquipoService,
              private observableService: ObservableService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  logOut() {
    this.authService.logOut();
    window.location.href = this.logoutApi;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    // this.subscription.unsubscribe();
  }

  ngOnInit() {
    if(localStorage.getItem('type') === 'Jugador'){
      this.equipoService.getMiEquipo().subscribe(res2 => {
        if (res2[0]) {
          this.observableService.tieneEquipo(true);
        } else {
          this.observableService.tieneEquipo(false);
        }
      });
    }
    this.subscription = this.observableService.getTieneEquipo().subscribe(data => {
      this.tieneEquipo = data.equipo;
    });
    this.observableService.cantNotificaciones.subscribe(res => {
      this.cantidad = res;
    });
    this.observableService.usuarioLogueado.subscribe(res => {
      this.mostrarMenu = res;
      if(localStorage.getItem('type') === 'Jugador'){
        this.equipoService.getMiEquipo().subscribe(res2 => {
          if (res2[0]) {
            this.observableService.tieneEquipo(true);
          } else {
            this.observableService.tieneEquipo(false);
          }
        });
      }
      this.subscription = this.observableService.getTieneEquipo().subscribe(data => {
        this.tieneEquipo = data.equipo;
      });
      this.observableService.cantNotificaciones.subscribe(res3 => {
        this.cantidad = res3;
      });
      if(localStorage.getItem('type'))
        this.tipoJugador = localStorage.getItem('type');
    });

    if(localStorage.getItem('type')){
      this.tipoJugador = localStorage.getItem('type');
      this.mostrarMenu = true;
    }
  }

  restarNotificacion() {
    this.restarNotificaciones.emit(true);
  }

}
