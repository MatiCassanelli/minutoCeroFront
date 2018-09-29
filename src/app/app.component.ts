import {Component} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {NotificacionService} from '../services/notificacionService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificacionService]
})
export class AppComponent {
  title = 'app';
  cantidad = 0;

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
    const socket = socketIo('http://localhost:3000');
    // console.log('hello'+localStorage.getItem('id'));
    socket.on('Reserva' + localStorage.getItem('id'), (data) => {
      localStorage.setItem('cantNotificaciones',
        ((parseInt(localStorage.getItem('cantNotificaciones'), 10) + 1).toString()));
        console.log(data);
      });
    socket.on('Partido' + localStorage.getItem('id'), (data) => {
      localStorage.setItem('cantNotificaciones',
        ((parseInt(localStorage.getItem('cantNotificaciones'), 10) + 1).toString()));
      console.log(data);
    });
    socket.on('Equipo' + localStorage.getItem('id'), (data) => {
      localStorage.setItem('cantNotificaciones',
        ((parseInt(localStorage.getItem('cantNotificaciones'), 10) + 1).toString()));
      console.log(data);
    });
    socket.on('Amigo' + localStorage.getItem('id'), (data) => {
      console.log('entro a socket amigo')
      localStorage.setItem('cantNotificaciones',
        ((parseInt(localStorage.getItem('cantNotificaciones'), 10) + 1).toString()));
      console.log(data);
    });
  }
  restarNotificacion(event) {
    this.cantidad -= 1;
  }

}
