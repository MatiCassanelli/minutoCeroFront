import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-notificacion',
  templateUrl: './card-notificacion.component.html',
  styleUrls: ['./card-notificacion.component.css']
})
export class CardNotificacionComponent implements OnInit {

  a: string;
  r: string;
  accion: string;
  respuesta: string;

  @Input() setAccion(accion: string) {
    this.a = accion;
  }

  @Input() setRespuesta(respuesta: string) {
    this.r = respuesta;
  }


  constructor() {
  }

  ngOnInit() {
  }

}
