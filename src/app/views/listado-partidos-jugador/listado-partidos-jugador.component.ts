import { Component, OnInit } from '@angular/core';
import {ReservaService} from '../../../services/reservaService';
import {PartidoService} from '../../../services/partidoService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listado-partidos-jugador',
  templateUrl: './listado-partidos-jugador.component.html',
  styleUrls: ['./listado-partidos-jugador.component.css']
})
export class ListadoPartidosJugadorComponent implements OnInit {

  misPartidos = [];
  constructor(private partidoService: PartidoService,
              private router: Router) { }

  ngOnInit() {
    this.partidoService.getPartidosJugados().subscribe(res => {
      this.misPartidos = res;
    });
  }

  goDetail(partido) {
    this.router.navigateByUrl('/partido/' + partido._id);
  }

}
