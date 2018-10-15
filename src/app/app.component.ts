import {Component} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {NotificacionService} from '../services/notificacionService';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificacionService]
})
export class AppComponent {
  title = 'app';
  cantidad = 0;
  jugador = localStorage.getItem('type');
  usuarioLogueado = localStorage.getItem('usuario');

  constructor(private notificacionService: NotificacionService) {
  }

  ngOnInit() {
    this.notificacionService.getCantNotificaciones().subscribe(res => {
      console.log('res', res);
      if (res.toString() === 'false')
        res = 0;
      localStorage.setItem('cantNotificaciones', res.toString());
      this.cantidad = parseInt(localStorage.getItem('cantNotificaciones'), 10);
    });

    let socket = socketIo(environment.baseUrl);
    // console.log('hello'+localStorage.getItem('id'));
    socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
      localStorage.setItem('cantNotificaciones',
        ((parseInt(localStorage.getItem('cantNotificaciones'), 10) + 1).toString()));
      console.log(data);
      this.notificacionService.getCantNotificaciones().subscribe(res => {
        console.log('res', res);
        if (res.toString() === 'false')
          res = 0;
        localStorage.setItem('cantNotificaciones', res.toString());
        this.cantidad = parseInt(localStorage.getItem('cantNotificaciones'), 10);
      });
    });
  }

  restarNotificacion(event) {
    this.cantidad -= 1;
  }

}
