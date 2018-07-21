import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EquipoService} from '../../services/equipoService';
import {Equipo} from '../models/equipo';
import {Jugador} from '../models/jugador';
import {JugadorService} from '../../services/jugadorService';

@Component({
  selector: 'app-info-equipo',
  templateUrl: './info-equipo.component.html',
  styleUrls: ['./info-equipo.component.css'],
  providers: [EquipoService, JugadorService]
})
export class InfoEquipoComponent implements OnInit {

  jugadores: Array<Jugador>;
  routeSub: any;
  equipo: Equipo;
  id: string;

  constructor(private route: ActivatedRoute,
              private equipoService: EquipoService,
              private jugadorService: JugadorService) {

    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params.id;
      console.log(this.id);
      this.equipoService.getEquipo(this.id).subscribe(eq => {
        this.equipo = eq[0];
        this.jugadores = this.getJugadoresOfEquipo(this.equipo.jugadores);
      });
    });
  }

  ngOnInit() {
  }

  getJugadoresOfEquipo(jugadores): Array<Jugador> {
    let array = new Array<Jugador>();
    for (let jug of jugadores) {
      this.jugadorService.getJugadorById(jug).subscribe(resp => {
        array.push(resp[0]);
      });
    }
    console.log(array);
    return array;
  }

}
