import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSidenav} from '@angular/material';
import {AuthService} from '../../../services/auth.service';
import * as global from '../../app.global';
// import {UsuarioService} from '../../_services/usuario.service';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css'],
  providers: [BreakpointObserver, MediaMatcher]
})
export class HeaderViewComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') sidenav: MatSidenav;
  login = false;
  @Input()
  set logueado(name: boolean) {
    this.login = name;
  }
  @Input() cantidad: number;
  @Output() restarNotificaciones: EventEmitter<boolean> = new EventEmitter<boolean>();

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  logoutApi = global.serverURL + '/auth/logout';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logOut(){
    this.authService.logOut();
    window.location.href = this.logoutApi;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    console.log(this.cantidad);
  }

  restarNotificacion() {
    debugger;
    this.restarNotificaciones.emit(true);
  }

}
