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
  capitan: Jugador;
  routeSub: any;
  equipo: Equipo;
  id: string;
  display: boolean;


  constructor(private route: ActivatedRoute,
              private equipoService: EquipoService,
              private jugadorService: JugadorService) {

    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params.id;
      console.log(this.id);
      this.equipoService.getEquipo(this.id).subscribe(eq => {
        this.equipo = eq[0];
        this.jugadorService.getJugadorById(this.equipo.capitan).toPromise().then(cap => {
          this.capitan = cap[0];
        });
        this.jugadores = this.getJugadoresOfEquipo(this.equipo.jugadores);
        console.log(this.equipo.capitan);
      });
    });
    this.display = false;
  }

  ngOnInit() {
  }

  showDialog() {
    this.display = true;
  }

  getJugadoresOfEquipo(jugadores): Array<Jugador> {
    let array = [];
    for (let jug of jugadores) {
      if (jug !== this.equipo.capitan) {
        this.jugadorService.getJugadorById(jug).subscribe(resp => {
          array.push(resp[0]);
        });
      }
    }
    console.log(array);
    return array;
  }

  agregarNuevosJugadores(event) {
    let jug = new Array();
    for (let a of event) {
      jug.push(a.email);
    }
    this.equipoService.invitarJugadores({
      _id: this.equipo._id,
      email: jug
    }).subscribe(resp => {
      this.equipo = resp;
      console.log(this.equipo);
    }, error1 => console.log(error1));
  }

  actualizarPantalla() {
    return window.location.reload();
  }
}
