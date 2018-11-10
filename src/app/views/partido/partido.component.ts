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
import {ReservaService} from '../../../services/reservaService';
import {Reserva} from '../../models/reserva';
import {DeporteService} from '../../../services/deporteService';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  providers: [ConfirmationService, PartidoService, PlantelService, PredioService]
})
export class PartidoComponent implements OnInit {

  idPartido: string;
  partido: Partido;
  reserva: Reserva;
  predio: Predio;
  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  fileNameDialogRef: MatDialogRef<MapDialogComponent>;
  editable: boolean;
  titulo: string;

  constructor(private route: ActivatedRoute,
              private jugadorService: JugadorService,
              private partidoService: PartidoService,
              private predioService: PredioService,
              private reservaService: ReservaService,
              private deporteService: DeporteService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idPartido = params.id;
      this.partidoService.getPartido(this.idPartido).subscribe(partido => {
        if (partido) {
          this.partido = partido;
          this.titulo = 'Partido';
          this.editable = (localStorage.getItem('id') === this.partido.organizador.toString());
          this.getPredio(partido.cancha);
        } else {
          this.reservaService.getReservaById(this.idPartido).subscribe(res => {
            this.reserva = res;
            this.titulo = 'Reserva';
            this.deporteService.getDeporteById(res.cancha.deporte.toString()).subscribe(dep => {
              this.reserva.cancha.deporte = dep.nombre;
            });
            this.getPredio(res.cancha);
          });
        }

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

  cancelarReserva(reserva) {
    if(this.partido){  // es reserva entonces
      this.partidoService.cancelarPartido(reserva._id).subscribe(res => {
        console.log(res);
        debugger;
      })
    } else if(this.reserva){
      this.reservaService.cancelarReserva(reserva._id).subscribe((res) => {
        this.reserva.estado = 'Cancelada';
      });
    }
  }
}
