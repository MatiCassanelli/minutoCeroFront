import { Component, OnInit } from '@angular/core';
import {ReservaService} from '../../../services/reservaService';
import {PartidoService} from '../../../services/partidoService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listado-reservas-jugador',
  templateUrl: './listado-reservas-jugador.component.html',
  styleUrls: ['./listado-reservas-jugador.component.css']
})
export class ListadoReservasJugadorComponent implements OnInit {

  misReservas = [];
  constructor(private reservaService: ReservaService,
              private partidoService: PartidoService,
              private router: Router) { }

  ngOnInit() {
    this.reservaService.getMisReservas().subscribe(res => {
      this.misReservas = res;
    });
  }

  goDetail(reserva) {
    this.partidoService.getPartidoByReserva(reserva).subscribe(res => {
      if(res)
        this.router.navigateByUrl('/partido/' + res._id);
      else
        this.router.navigateByUrl('/partido/' + reserva._id);
    });
  }

}
