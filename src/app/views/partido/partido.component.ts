import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PartidoService} from '../../../services/partidoService';
import {Partido} from '../../models/partido';
import {PredioService} from '../../../services/predioService';
import {Predio} from '../../models/predio';
import {Plantel} from '../../models/plantel';
import {PlantelService} from '../../../services/plantelService';
import {ConfirmationService} from 'primeng/api';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MapDialogComponent} from '../../component/map-dialog/map-dialog.component';
import {debug} from 'util';
import {JugadorService} from '../../../services/jugadorService';

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
  predio: Predio;
  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  fileNameDialogRef: MatDialogRef<MapDialogComponent>;
  editable: boolean;

  constructor(private route: ActivatedRoute,
              private jugadorService: JugadorService,
              private partidoService: PartidoService,
              private predioService: PredioService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idPartido = params.id;
      this.partidoService.getPartido(this.idPartido).subscribe(partido => {
        this.partido = partido;
        this.editable = (localStorage.getItem('id') === this.partido.organizador.toString());
        this.getPredio(partido.cancha);
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

  openDialog() {
    // this.fileNameDialogRef = this.dialog.open(MapComponent, {
    this.fileNameDialogRef = this.dialog.open(MapDialogComponent, {
      data: this.predio,
      width: '600px',
      maxWidth: null,
    });
  }
}
