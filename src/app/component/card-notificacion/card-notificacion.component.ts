import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ReservaService} from '../../../services/reservaService';
import {PartidoService} from '../../../services/partidoService';

@Component({
  selector: 'app-card-notificacion',
  templateUrl: './card-notificacion.component.html',
  styleUrls: ['./card-notificacion.component.css']
})
export class CardNotificacionComponent implements OnInit {

  @Input() mensaje: string;
  @Input() noti: any;
  @Output() swipe: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private router: Router,
              private partidoService: PartidoService,
              private reservaService: ReservaService) {
  }

  ngOnInit() {
    if(this.noti.reserva) {
      this.mensaje = this.noti.mensaje;
      // if (this.mensaje.includes('Reservada'))
      //   this.mensaje = this.mensaje.replace('Reservada', 'Aceptada');
      // if (this.mensaje.includes('Cancelada'))
      //   this.mensaje = this.mensaje.replace('Cancelada', 'Rechazada');
    }
    this.mensaje = this.noti.mensaje;
  }

  swipeEvent() {
    this.swipe.emit(true);
  }

  goToPartido() {
    if(this.noti.reserva){
      this.reservaService.getReservaById(this.noti.reserva).subscribe(res => {
        this.partidoService.getPartidoByReserva(res.cancha._id, res.jugador._id, res.dia).subscribe(partido => {
          if(partido)
            this.router.navigate(['/partido/' + partido._id, {reelegir: true}]);
          else
            this.router.navigate(['/partido/' + res._id, {reelegir: true}]);
        });
      });
    }

  }
}
