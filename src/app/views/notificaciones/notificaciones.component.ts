import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificacionService} from '../../../services/notificacionService';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  providers: [NotificacionService, MatSnackBar]
})
export class NotificacionesComponent implements OnInit {

  notificaciones = [];
  @Output() restarNotificaciones: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificacionService: NotificacionService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.notificacionService.getNotificaciones().subscribe(res => {
      this.notificaciones = res[0];
      this.notificaciones = this.notificaciones.concat(res[1]);
    });
  }
  restarNotificacion(notificacion) {
    this.openSnackBar();
    this.notificaciones.splice(this.notificaciones.indexOf(notificacion), 1);
    localStorage.setItem('cantNotificaciones',
      ((parseInt(localStorage.getItem('cantNotificaciones'), 10) - 1).toString()));
  }

  openSnackBar() {
    this.snackBar.open('Notificacion Eliminada', '', {
      duration: 750,
    });
  }
}
