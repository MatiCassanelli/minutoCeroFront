import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PartidoService} from '../../../services/partidoService';
import {Partido} from '../../models/partido';
import {PredioService} from '../../../services/predioService';
import {Predio} from '../../models/predio';
import {Plantel} from '../../models/plantel';
import {PlantelService} from '../../../services/plantelService';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  providers: [ConfirmationService, PartidoService, PlantelService, PredioService]
})
export class PartidoComponent implements OnInit {

  idPartido: string;
  partido: Partido;
  displayDialog = false;
  predio: Predio = new Predio();
  plantelLocal: Plantel;
  plantelVisitante: Plantel;

  constructor(private route: ActivatedRoute,
              private partidoService: PartidoService,
              private predioService: PredioService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idPartido = params.id;
      console.log(this.idPartido);
      this.partidoService.getPartido(this.idPartido).subscribe(partido => {
        this.partido = partido;
        this.getPredio(partido.cancha);
        console.log(this.partido);
      });
    });
  }

  getPredio(cancha) {
    this.predioService.getPredio(cancha.predio).subscribe(ub => {
      this.predio = ub;
      console.log(this.predio);
    });
  }

  getPlanteles(event) {
    this.plantelLocal = event[0];
    this.plantelVisitante = event[1];
  }
}
