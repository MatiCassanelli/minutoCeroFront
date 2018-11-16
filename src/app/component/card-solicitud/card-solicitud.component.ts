import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificacionService} from '../../../services/notificacionService';
import {ObservableService} from '../../observable.service';

@Component({
  selector: 'app-card-solicitud',
  templateUrl: './card-solicitud.component.html',
  styleUrls: ['./card-solicitud.component.css']
})
export class CardSolicitudComponent implements OnInit {

  @Input() solicitud: any;
  @Output() restarNotificacion: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificacionService: NotificacionService,
              private observableService: ObservableService) { }

  ngOnInit() {
  }

  responder(respuesta) {
    this.notificacionService.responder(this.solicitud._id, this.solicitud.tipo, respuesta).subscribe(res => {
      this.restarNotificacion.emit();
      if(respuesta === 'Aceptado' && this.solicitud.tipo === 'Equipo')
        this.observableService.tieneEquipo(true);
    });
  }

}
