import { Component, OnInit } from '@angular/core';
import {Partido} from '../../models/partido';
import {PartidoService} from '../../../services/partidoService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-jugador',
  templateUrl: './home-jugador.component.html',
  styleUrls: ['./home-jugador.component.css'],
  providers: [PartidoService]
})
export class HomeJugadorComponent implements OnInit {

  estado: string
  partidosIncompletos: Partido[];
  constructor(private partidoService: PartidoService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onTabChange(event) {
    console.log({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    console.log(event);
    this.estado = event.header;
  }

  crearPartido() {
    this.router.navigateByUrl('/partido/organizar');
  }
  unirsePartido(idPartido) {
    this.router.navigateByUrl('/partido/' + idPartido);
  }
}
