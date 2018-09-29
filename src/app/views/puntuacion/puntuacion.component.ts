import {Component, OnInit} from '@angular/core';
import {CalificacionService} from '../../../services/calificacionService';
import {Jugador} from '../../models/jugador';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Predio} from '../../models/predio';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.css'],
  providers: [CalificacionService]
})
export class PuntuacionComponent implements OnInit {

  jugadores: Jugador[];
  predios: Predio[];

  constructor(private calificacionService: CalificacionService) {
  }

  ngOnInit() {
    forkJoin(this.calificacionService.getJugadoresPorClasificar(),
      this.calificacionService.getPrediosPorClasificar()).subscribe(res => {
      this.jugadores = res[0];
      this.predios = res[1];
    });
  }

  setCalificacion(event) {
    if (event.jugador.type === 'Jugador')
      this.calificacionService.putCalificacionJugador(event.puntuacion, event.jugador._id).subscribe(res => {
        console.log(res);
      });
    if (event.jugador.type === 'Predio')
      this.calificacionService.putCalificacionPredio(event.puntuacion, event.jugador._id).subscribe(res => {
        console.log(res);
      });
  }
}
