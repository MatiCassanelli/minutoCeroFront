import {Component, OnDestroy, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {NotificacionService} from '../services/notificacionService';
import {environment} from '../environments/environment';
import {ObservableService} from './observable.service';
import {Subscription} from 'rxjs/Subscription';
import {ReservaService} from '../services/reservaService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificacionService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  cantidad = 0;
  // jugador = localStorage.getItem('type');
  jugador: string;
  subscription = new Subscription();
  paso = false;

  constructor(private notificacionService: NotificacionService,
              private observableService: ObservableService,
              private reservaService: ReservaService) {
  }

  ngOnInit() {
    // observer para cuando entra desde login
    this.observableService.usuarioLogueado.subscribe(() => {
      this.jugador = localStorage.getItem('type');
      if (this.jugador === 'Jugador') {
        this.notificacionService.getCantNotificaciones().subscribe(res => {
          if (res.toString() === 'false')
            res = 0;
          this.cantidad = res;
          this.observableService.changeMessage(this.cantidad);
        });

        const socket = socketIo(environment.socketUrl);
        socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
          this.observableService.cantNotificaciones.subscribe(res => {
            if (!this.paso) {
              this.cantidad = res + 1;
              this.paso = true;
            }
          });
          this.observableService.changeMessage(this.cantidad);
          this.paso = false;
        });
      } else if (this.jugador === 'Predio') {
        this.reservaService.getCantNotificacionesReserva().subscribe(res => {
          this.notificacionService.getCantNotificaciones().subscribe(res2 => {
            if (res.toString() === 'false')
              res = 0;
            if (res2.toString() === 'false')
              res2 = 0;
            this.cantidad = res + res2;
            this.observableService.changeMessage(this.cantidad);
          });
        });

        const socket = socketIo(environment.socketUrl);
        socket.on('Reserva' + localStorage.getItem('id'), (data) => {
          this.observableService.cantNotificaciones.subscribe(res => {
            if (!this.paso) {
              this.cantidad = res + 1;
              this.paso = true;
            }
          });
          this.observableService.changeMessage(this.cantidad);
          this.paso = false;
        });
        socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
          this.observableService.cantNotificaciones.subscribe(res => {
            if (!this.paso) {
              this.cantidad = res + 1;
              this.paso = true;
            }
          });
          this.observableService.changeMessage(this.cantidad);
          this.paso = false;
        });
      }
    });

    // fuera del observer para cuando actualiza la pagina
    this.jugador = localStorage.getItem('type');
    if (this.jugador === 'Jugador') {
      this.notificacionService.getCantNotificaciones().subscribe(res => {
        if (res.toString() === 'false')
          res = 0;
        this.cantidad = res;
        this.observableService.changeMessage(this.cantidad);
      });

      const socket = socketIo(environment.socketUrl);
      socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
        this.observableService.cantNotificaciones.subscribe(res => {
          if (!this.paso) {
            this.cantidad = res + 1;
            this.paso = true;
          }
        });
        this.observableService.changeMessage(this.cantidad);
        this.paso = false;
      });
    } else if (this.jugador === 'Predio') {
      this.reservaService.getCantNotificacionesReserva().subscribe(res => {
        this.notificacionService.getCantNotificaciones().subscribe(res2 => {
          if (res.toString() === 'false')
            res = 0;
          if (res2.toString() === 'false')
            res2 = 0;
          this.cantidad = res + res2;
          this.observableService.changeMessage(this.cantidad);
        });
      });

      const socket = socketIo(environment.socketUrl);
      socket.on('Reserva' + localStorage.getItem('id'), (data) => {
        this.observableService.cantNotificaciones.subscribe(res => {
          if (!this.paso) {
            this.cantidad = res + 1;
            this.paso = true;
          }
        });
        this.observableService.changeMessage(this.cantidad);
        this.paso = false;
      });
      socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
        this.observableService.cantNotificaciones.subscribe(res => {
          if (!this.paso) {
            this.cantidad = res + 1;
            this.paso = true;
          }
        });
        this.observableService.changeMessage(this.cantidad);
        this.paso = false;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  restarNotificacion(event) {
    this.cantidad -= 1;
  }

}
