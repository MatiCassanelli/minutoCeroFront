import {Component, OnInit} from '@angular/core';
import {ConfirmationService, SelectItem} from 'primeng/api';
import {PlantelService} from '../../../services/plantelService';
import {Jugador} from '../../models/jugador';
import {Plantel} from '../../models/plantel';
import {Router} from '@angular/router';
import {PredioService} from '../../../services/predioService';
import {Predio} from '../../models/predio';
import {Partido} from '../../models/partido';
import {PartidoService} from '../../../services/partidoService';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeporteService} from '../../../services/deporteService';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MapDialogComponent} from '../../component/map-dialog/map-dialog.component';
import {MapComponent} from '../../component/map/map.component';
import {ReservaService} from '../../../services/reservaService';
import {Deporte} from '../../models/deporte';


@Component({
  selector: 'app-organizar-partido',
  templateUrl: './organizar-partido.component.html',
  styleUrls: ['./organizar-partido.component.css'],
  providers: [ConfirmationService,
    PlantelService,
    PredioService,
    PartidoService,
    DeporteService,
    ReservaService]
})
export class OrganizarPartidoComponent implements OnInit {

  form: FormGroup;
  deporte: Deporte;
  deportes: Deporte[];
  predios: Predio[];
  selectedPredio: Predio;
  canchaSeleccionada: Deporte;
  fechaPartido: Date;
  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  ubicacion = {
    lat: String,
    lng: String
  };
  mostrarLabel = false;
  fileNameDialogRef: MatDialogRef<MapDialogComponent>;
  porcentajeOcupacion = 0;

  constructor(private fb: FormBuilder,
              private plantelService: PlantelService,
              private predioService: PredioService,
              private partidoService: PartidoService,
              private deporteService: DeporteService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private dialog: MatDialog,
              private reservaService: ReservaService) {
  }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      // this.tiposCancha = [];
      this.deportes = res;
    });
    this.predioService.getAllPredios().subscribe(predios => {
      this.predios = predios;
    });
    this.plantelLocal = new Plantel();
    this.plantelVisitante = new Plantel();
  }

  getPlanteles(event) {
    this.plantelLocal = event[0];
    this.plantelVisitante = event[1];
    if (!this.deporte.cantJugadores)
      this.porcentajeOcupacion = 0;
    this.porcentajeOcupacion = (this.plantelLocal.jugadoresConfirmados.length +
      this.plantelVisitante.jugadoresConfirmados.length) / this.deporte.cantJugadores * 100;
  }

  getTipoCancha(event) {
    this.canchaSeleccionada = event;
    this.deporte = this.deportes.find(x => x._id === event);
  }

  getFecha(event) {
    this.fechaPartido = event;
  }

  crearPartido() {
    let cancha: any;
    // const infoPartido = {
    //   nombreDeporte: this.deporte.nombre,
    //   nombrePredio: this.selectedPredio.nombrePredio,
    //   dia: this.fechaPartido,
    //   organizador: JSON.parse(localStorage.getItem('usuario'))
    // };
    // console.log(infoPartido);
    forkJoin(this.predioService.getCanchasWithPredio(this.selectedPredio._id),
      this.plantelService.createPlantel(this.plantelLocal.jugadoresConfirmados, 'Local', this.deporte.cantJugadores),
      this.plantelService.createPlantel(this.plantelVisitante.jugadoresConfirmados, 'Visitante', this.deporte.cantJugadores)).subscribe(res => {
      cancha = res[0][0];
      let local = res[1];
      let visitante = res[2];
      this.partidoService.createPartido({
        deporte: this.deporte._id,
        grupoLocal: local,
        grupoVisitante: visitante,
        dia: this.fechaPartido,
        cancha: cancha._id,
        horasDeJuego: 1
      }).subscribe(() => {
        forkJoin(this.plantelService.updatePlantel(local._id, local.jugadoresConfirmados, this.plantelLocal.jugadores),
          this.plantelService.updatePlantel(visitante._id, visitante.jugadoresConfirmados, this.plantelVisitante.jugadores)).subscribe(() => {
          this.reservaService.createReserva({
            estado: 'PreReserva',
            dia: this.fechaPartido,
            cancha: cancha._id
          }).subscribe(reserva => {
            this.router.navigateByUrl('/partido');
          });
        });

      });
    });
  }

  openDialog() {
    this.fileNameDialogRef = this.dialog.open(MapDialogComponent, {
      data: this.predios,
      maxWidth: null,
      width: '600px',
    });
    this.fileNameDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.ubicacion = res.ubicacion;
        this.selectedPredio = res.predio;
        this.mostrarLabel = true;
      }
    });
  }
}

