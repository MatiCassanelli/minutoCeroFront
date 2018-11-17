import {Component, OnInit} from '@angular/core';
import {CalificacionService} from '../../../services/calificacionService';
import {Jugador} from '../../models/jugador';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Predio} from '../../models/predio';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.css'],
  providers: [CalificacionService]
})
export class PuntuacionComponent implements OnInit {

  jugadores: Jugador[];
  predios: Predio[];
  quienPuntua = localStorage.getItem('type');
  constructor(private calificacionService: CalificacionService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if(this.quienPuntua === 'Jugador') {
      forkJoin(this.calificacionService.getJugadoresPorClasificar(),
        this.calificacionService.getPrediosPorClasificar()).subscribe(res => {
        this.jugadores = res[0];
        this.predios = res[1];
      });
    } else {
      this.calificacionService.getJugadoresParaPredio().subscribe(res => {
        this.jugadores = res;
      });
    }

  }

  setCalificacion(event) {
    if (event.jugador.type === 'Jugador')
      this.calificacionService.putCalificacionJugador(event.puntuacion, event.jugador._id).subscribe(() => {
        this.jugadores.splice(this.jugadores.indexOf(event.jugador), 1);
        this._openSnackBar(event.jugador.type);
      });
    if (event.jugador.type === 'Predio')
      this.calificacionService.putCalificacionPredio(event.puntuacion, event.jugador._id).subscribe(() => {
        this.jugadores.splice(this.jugadores.indexOf(event.jugador), 1);
        this._openSnackBar(event.jugador.type);
      });
  }

  private _openSnackBar(usuario) {
    this.snackBar.open(usuario + ' Calificado', '', {
      duration: 750,
    });
  }
}
