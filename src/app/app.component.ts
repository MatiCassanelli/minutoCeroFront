import {Component, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {NotificacionService} from '../services/notificacionService';
import {environment} from '../environments/environment';
import {ObservableService} from './observable.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificacionService]
})
export class AppComponent implements OnInit {
  title = 'app';
  cantidad = 0;
  jugador = localStorage.getItem('type');
  usuarioLogueado = localStorage.getItem('usuario');
  subscription: Subscription;

  constructor(private notificacionService: NotificacionService,
              private observableService: ObservableService) {
  }

  ngOnInit() {
    // this.notificacionService.getCantNotificaciones().subscribe(res => {
    //   console.log('res', res);
    //   if (res.toString() === 'false')
    //     res = 0;
    //   localStorage.setItem('cantNotificaciones', res.toString());
    //   this.cantidad = parseInt(localStorage.getItem('cantNotificaciones'), 10);
    // });
    this.notificacionService.getCantNotificaciones().subscribe(res => {
      console.log('res', res);
      if (res.toString() === 'false')
        res = 0;
      this.observableService.setCantidadNotificaciones(res);
    });

    const socket = socketIo(environment.baseUrl);
    socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
      console.log(data);
      this.subscription = this.observableService.getData().subscribe(cant => {
        this.observableService.setCantidadNotificaciones(cant + 1);
      });
  });
    //
    // let socket = socketIo(environment.baseUrl);
    // // console.log('hello'+localStorage.getItem('id'));
    // socket.on('Notificacion' + localStorage.getItem('id'), (res) => {
    //   // localStorage.setItem('cantNotificaciones',
    //   //   ((parseInt(localStorage.getItem('cantNotificaciones'), 10) + 1).toString()));
    //   // console.log(data);
    //   // this.notificacionService.getCantNotificaciones().subscribe(res => {
    //   //   console.log('res', res);
    //   //   if (res.toString() === 'false')
    //   //     res = 0;
    //   //   localStorage.setItem('cantNotificaciones', res.toString());
    //   //   this.cantidad = parseInt(localStorage.getItem('cantNotificaciones'), 10);
    //   // });
    //   console.log('socket', res);
    //   debugger;
    //   this.subscription = this.observableService.getData().subscribe(data => {
    //     this.cantidad = data.cantidadNotificaciones + 1;
    //     this.observableService.setCantidadNotificaciones(this.cantidad);
    //   });
    // });
  }

  restarNotificacion(event) {
    this.cantidad -= 1;
  }

}
