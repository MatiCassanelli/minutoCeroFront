import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificacionService} from '../../../services/notificacionService';
import {MatSnackBar} from '@angular/material';
import {EquipoService} from '../../../services/equipoService';
import {ObservableService} from '../../observable.service';
import {ReservaService} from '../../../services/reservaService';
import {debug} from 'util';
import * as socketIo from "socket.io-client";
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  providers: [NotificacionService, MatSnackBar]
})
export class NotificacionesComponent implements OnInit {

  solicitudes = [];
  notificaciones = [];
  reservas = [];
  predio = false;
  @Output() restarNotificaciones: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private notificacionService: NotificacionService,
              private reservaService: ReservaService,
              private snackBar: MatSnackBar,
              private observableService: ObservableService) {
  }

  ngOnInit() {
    this.getNotificaciones();
    const socket = socketIo(environment.socketUrl);
    socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
      this.getNotificaciones();
    });
    socket.on('Reserva' + localStorage.getItem('id'), (data) => {
      this.getNotificaciones();
    });
  }

  getNotificaciones() {
    if (localStorage.getItem('type') === 'Jugador') {
      this.notificacionService.getNotificaciones().subscribe(res => {
        this.solicitudes = res['solicitudes'];
        this.notificaciones = res['notificaciones'];
      });
    } else if (localStorage.getItem('type') === 'Predio') {
      this.predio = true;
      this.reservaService.getNotificacionesReserva().subscribe(res => {
        this.reservas = res;
      });
      this.notificacionService.getNotificaciones().subscribe(res => {
        this.notificaciones = res['notificaciones'];
      });
    }
  }

  restarNotificacion(notificacion) {
    let cantidad: number;
    if (notificacion.tipo === 'n') {
      this.notificacionService.updateNotificacion(notificacion.value._id).subscribe(() => {
      });
      this.notificaciones.splice(this.notificaciones.indexOf(notificacion.value), 1);
    } else {
      this.solicitudes.splice(this.solicitudes.indexOf(notificacion.value), 1);
    }
    this.observableService.cantNotificaciones.subscribe(res => {
      cantidad = res;
    });
    this.openSnackBar();
    this.observableService.changeMessage(cantidad - 1);
    window.navigator.vibrate(200);
  }


  restarNotificacionPredio(notificacion, respuesta) {
    let cantidad: number;
    if (notificacion.estado === 'Solicitada') {
      this.reservaService.putEstado(notificacion._id, respuesta).subscribe(() => {
      });
    } else {
      this.reservaService.putEstado(notificacion._id, 'Vista').subscribe(() => {
      });
    }
    this.reservas.splice(this.reservas.indexOf(notificacion), 1);
    this.observableService.cantNotificaciones.subscribe(res => {
      cantidad = res;
    });
    this.openSnackBar();
    this.observableService.changeMessage(cantidad - 1);
    window.navigator.vibrate(200);

  }

  openSnackBar() {
    this.snackBar.open('Notificacion Eliminada', '', {
      duration: 750,
    });
  }
}
