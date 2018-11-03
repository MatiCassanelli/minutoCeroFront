import {Component, Input, OnInit} from '@angular/core';
import {ReservaService} from '../../../services/reservaService';

@Component({
  selector: 'app-reserva-info',
  templateUrl: './reserva-info.component.html',
  styleUrls: ['./reserva-info.component.css']
})
export class ReservaInfoComponent implements OnInit {

  editable = true;
  @Input() reservaId: string;
  reserva: any;
  jugador: {
    nombre: string,
    apellido: string,
    telefono: string
  };

  constructor(private reservaService: ReservaService) {
  }

  ngOnInit() {
    this.reservaService.getReservaById(this.reservaId).subscribe(res => {
      this.reserva = res;
      if (res.jugador) {
        this.jugador = {
          nombre: res.jugador.nombre,
          apellido: res.jugador.apellido,
          telefono: res.jugador.telefono
        };
      } else {
        this.jugador = {
          nombre: res.jugadorNoRegistrado.nombre,
          apellido: res.jugadorNoRegistrado.apellido,
          telefono: res.jugadorNoRegistrado.telefono
        };
      }
    });
  }

}
