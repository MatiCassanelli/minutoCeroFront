import {Component, OnDestroy, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {NotificacionService} from '../services/notificacionService';
import {environment} from '../environments/environment';
import {ObservableService} from './observable.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificacionService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  cantidad = 0;
  jugador = localStorage.getItem('type');
  usuarioLogueado = localStorage.getItem('usuario');
  subscription = new Subscription();
  paso = false;

  constructor(private notificacionService: NotificacionService,
              private observableService: ObservableService) {
  }

  ngOnInit() {
    this.notificacionService.getCantNotificaciones().subscribe(res => {
      console.log('res', res);
      if (res.toString() === 'false')
        res = 0;
      this.cantidad = res;
      // this.observableService.setCantidadNotificaciones(res);
      // this.observableService.changeMessage(res);
      this.observableService.changeMessage(this.cantidad);
    });

    const socket = socketIo(environment.socketUrl);
    socket.on('Notificacion' + localStorage.getItem('id'), (data) => {
      console.log('Socket', data);
      this.observableService.currentMessage.subscribe(res => {
        if(!this.paso){
          this.cantidad = res + 1;
          this.paso = true;
        }
      });
      this.observableService.changeMessage(this.cantidad);
      this.paso = false;

      // this.observableService.setCantidadNotificaciones(this.cantidad + 1);
      // this.subscription = this.observableService.getCantNotificaciones().subscribe(cant => {
      //   this.observableService.setCantidadNotificaciones(cant.cantidadNotificaciones + 1);
      // });
    });

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

  ngOnDestroy() {
    console.log('destroying');
    this.subscription.unsubscribe();
  }

  restarNotificacion(event) {
    this.cantidad -= 1;
  }

}
