import { Component, OnInit } from '@angular/core';
import {Partido} from '../../models/partido';
import {PartidoService} from '../../../services/partidoService';

@Component({
  selector: 'app-home-jugador',
  templateUrl: './home-jugador.component.html',
  styleUrls: ['./home-jugador.component.css'],
  providers: [PartidoService]
})
export class HomeJugadorComponent implements OnInit {

  partidosIncompletos: Partido[];
  constructor(private partidoService: PartidoService) {
    this.partidoService.getPartidos('Incompleto').subscribe(incompletos => {
      console.log(incompletos);
      this.partidosIncompletos = incompletos;
    });
  }

  ngOnInit() {
  }

}
