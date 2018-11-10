import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservaService} from '../../../services/reservaService';
import {Reserva} from '../../models/reserva';

@Component({
  selector: 'app-reserva-info',
  templateUrl: './reserva-info.component.html',
  styleUrls: ['./reserva-info.component.css']
})
export class ReservaInfoComponent implements OnInit {

  editable = true;
  @Input() reservaId: string;
  reserva: Reserva;
  jugador: {
    nombre: string,
    apellido: string,
    telefono: string
  };
  @Output() cancelarEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private reservaService: ReservaService) {
  }

  ngOnInit() {
    this.reservaService.getReservaById(this.reservaId).subscribe(res => {
      this.reserva = res;
      if (res.jugador) {
        this.jugador = {
          nombre: res.jugador.nombre,
          apellido: res.jugador.apellido,
          telefono: ''
        };
      } else {
        this.jugador = {
          nombre: res.jugadorNoRegistrado.nombre || '',
          apellido: res.jugadorNoRegistrado.apellido || '',
          telefono: res.jugadorNoRegistrado.telefono || ''
        };
      }
    });
  }

  cancelarReserva() {
    this.reservaService.cancelarReservaPredio(this.reserva._id).subscribe(res => {
      console.log(res);
      this.cancelarEmit.emit(true);
    });
  }

}
