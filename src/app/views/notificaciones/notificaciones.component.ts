import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificacionService} from '../../../services/notificacionService';
import {MatSnackBar} from '@angular/material';
import {EquipoService} from '../../../services/equipoService';
import {ObservableService} from '../../observable.service';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  providers: [NotificacionService, MatSnackBar]
})
export class NotificacionesComponent implements OnInit {

  solicitudes = [];
  notificaciones = [];
  @Output() restarNotificaciones: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificacionService: NotificacionService,
              private snackBar: MatSnackBar,
              private observableService: ObservableService) { }

  ngOnInit() {
    this.notificacionService.getNotificaciones().subscribe(res => {
      console.log(res);
      this.solicitudes = res['solicitudes'];
      this.notificaciones = res['notificaciones'];
    });
  }
  restarNotificacion(notificacion) {
    this.openSnackBar();
    if(notificacion.tipo === 'n') {
      this.notificacionService.updateNotificacion(notificacion.value._id).subscribe(() => {
        this.notificaciones.splice(this.notificaciones.indexOf(notificacion), 1);
      });
    } else if(notificacion.tipo === 's') {
      this.solicitudes.splice(this.notificaciones.indexOf(notificacion), 1);
      let cantidad: number
      this.observableService.cantNotificaciones.subscribe(res => {
        cantidad = res;
      });
      this.observableService.changeMessage(cantidad - 1);
    }
    window.navigator.vibrate(200);
  }

  openSnackBar() {
    this.snackBar.open('Notificacion Eliminada', '', {
      duration: 750,
    });
  }
}
