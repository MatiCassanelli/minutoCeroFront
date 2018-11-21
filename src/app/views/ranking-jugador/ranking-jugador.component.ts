import { Component, OnInit } from '@angular/core';
import {JugadorService} from '../../../services/jugadorService';
import {Jugador} from '../../models/jugador';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ranking-jugador',
  templateUrl: './ranking-jugador.component.html',
  styleUrls: ['./ranking-jugador.component.css']
})
export class RankingJugadorComponent implements OnInit {

  jugadores: Jugador[];
  constructor(private jugadorService: JugadorService,
              private router: Router) { }

  ngOnInit() {
    this.jugadorService.getJugadoresRankeados().subscribe(res => {
      this.jugadores = res;
    });
  }

  goPerfil(id) {
   this.router.navigateByUrl('/jugador/jugador/' + id) ;
  }
}
