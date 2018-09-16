import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-notificacion',
  templateUrl: './card-notificacion.component.html',
  styleUrls: ['./card-notificacion.component.css']
})
export class CardNotificacionComponent implements OnInit {

  @Input() a: string;
  @Input() r: string;
  accion: string;
  respuesta: string;

  @Input() setAccion(accion: string) {
    this.accion = accion;
  }

  @Input() setRespuesta(respuesta: string) {
    this.respuesta = respuesta;
  }


  constructor() {
  }

  ngOnInit() {
  }

}
