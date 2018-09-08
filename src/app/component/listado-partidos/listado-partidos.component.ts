import {Component, Input, OnInit} from '@angular/core';
import {Partido} from '../../models/partido';
import {PartidoService} from '../../../services/partidoService';
import {Router} from '@angular/router';
import {PredioService} from '../../../services/predioService';
import {Predio} from 'app/models/predio';

@Component({
  selector: 'app-listado-partidos',
  templateUrl: './listado-partidos.component.html',
  styleUrls: ['./listado-partidos.component.css'],
  providers: [PartidoService, PredioService]
})
export class ListadoPartidosComponent implements OnInit {

  partidosIncompletos: Partido[];
  estado: string;
  @Input()
  set setEstadoPartido(name: string) {
    this.estado = name;
  }
  predios = [];

  constructor(private partidoService: PartidoService,
              private predioService: PredioService,
              private router: Router) {
  }

  ngOnInit() {
    this.partidoService.getPartidos(this.estado).subscribe(incompletos => {
      this.partidosIncompletos = incompletos;
      this.getInfoPredio(incompletos);
    });
  }

  getInfoPredio(partidos) {
    for (let p of partidos) {
      this.predioService.getPredio(p.cancha.predio).subscribe(rta => {
        this.predios.push(rta);
      });
    }
  }

  goToPartido(idPartido) {
    this.router.navigateByUrl('/partido/' + idPartido);
  }

}
