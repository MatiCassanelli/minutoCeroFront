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
      this.mensaje = 'Solicitud de reserva para ' + this.reserva.cancha.nombreCancha;
    } else if (this.reserva.estado === 'PreReserva') {
      this.mensaje = 'PreReserva ' + this.reserva.cancha.nombreCancha;
    }
  }

  responder(rta) {
    this.restarNotificacion.emit(rta);
    console.log(rta);
  }


}
