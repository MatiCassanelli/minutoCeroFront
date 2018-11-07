import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificacionService} from '../../../services/notificacionService';
import {MatSnackBar} from '@angular/material';
import {EquipoService} from '../../../services/equipoService';
import {ObservableService} from '../../observable.service';
import {ReservaService} from '../../../services/reservaService';


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
    if (localStorage.getItem('type') === 'Jugador') {
      this.notificacionService.getNotificaciones().subscribe(res => {
        console.log(res);
        this.solicitudes = res['solicitudes'];
        this.notificaciones = res['notificaciones'];
      });
    } else if (localStorage.getItem('type') === 'Predio') {
      this.predio = true;
      this.reservaService.getNotificacionesReserva().subscribe(res => {
        this.reservas = res;
      });
    }

  }

  restarNotificacion(notificacion) {
    this.openSnackBar();
    let cantidad: number;
    if (notificacion.tipo === 'n') {
      this.notificacionService.updateNotificacion(notificacion.value._id).subscribe(() => {
      });
    }
    this.solicitudes.splice(this.notificaciones.indexOf(notificacion), 1);
    this.observableService.cantNotificaciones.subscribe(res => {
      cantidad = res;
    });
    this.observableService.changeMessage(cantidad - 1);
    window.navigator.vibrate(200);
  }


  restarNotificacionPredio(notificacion, respuesta) {
    this.reservaService.putEstado(notificacion._id, respuesta).subscribe(() => {
      this.reservas.splice(this.reservas.indexOf(notificacion), 1);
    });
  }

  openSnackBar() {
    this.snackBar.open('Notificacion Eliminada', '', {
      duration: 750,
    });
  }
}
