import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-card-notificacion-reserva',
  templateUrl: './card-notificacion-reserva.component.html',
  styleUrls: ['./card-notificacion-reserva.component.css']
})
export class CardNotificacionReservaComponent implements OnInit {

  @Input() reserva: any;
  @Output() restarNotificacion: EventEmitter<string> = new EventEmitter<string>();
  mensaje: string;

  constructor() {
  }

  ngOnInit() {
    if (this.reserva.estado === 'Solicitada') {
      this.mensaje = 'Tenés una solicitud pendiente para la ' + this.reserva.cancha.nombreCancha + ' para el dia ' + moment(this.reserva.dia).format('DD/MM HH:mm');
    } else if (this.reserva.estado === 'PreReserva') {
      this.mensaje = 'Se pre reservó la cancha ' + this.reserva.cancha.nombreCancha + '. Esperando que se complete el minimo.'
    }
  }

  responder(rta) {
    this.restarNotificacion.emit(rta);
    console.log(rta);
  }

}
