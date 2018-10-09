import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificacionService} from '../../../services/notificacionService';

@Component({
  selector: 'app-card-solicitud',
  templateUrl: './card-solicitud.component.html',
  styleUrls: ['./card-solicitud.component.css']
})
export class CardSolicitudComponent implements OnInit {

  @Input() solicitud: any;
  @Output() restarNotificacion: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificacionService: NotificacionService) { }

  ngOnInit() {
  }

  responder(respuesta) {
    this.notificacionService.responder(this.solicitud._id, this.solicitud.tipo, {
      respuesta: respuesta
    }).subscribe(res => {
      this.restarNotificacion.emit();
    });
  }

}
