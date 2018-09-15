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
import { MatDialog, MatDialogRef } from '@angular/material';
import {MapDialogComponent} from '../../component/map-dialog/map-dialog.component';
import {MapComponent} from '../../component/map/map.component';


@Component({
  selector: 'app-organizar-partido',
  templateUrl: './organizar-partido.component.html',
  styleUrls: ['./organizar-partido.component.css'],
  providers: [ConfirmationService,
    PlantelService,
    PredioService,
    PartidoService,
    DeporteService]
})
export class OrganizarPartidoComponent implements OnInit {

  form: FormGroup;
  tiposCancha: SelectItem[];
  predios: Predio[];
  selectedPredio: Predio;
  canchaSeleccionada: any;
  fechaPartido: Date;
  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  displayDialog = false;
  ubicacion = {
    lat: String,
    lng: String
  };
  mostrarLabel = false;
  idPartido = null;
  // fileNameDialogRef: MatDialogRef<MapComponent>;
  fileNameDialogRef: MatDialogRef<MapDialogComponent>;

  constructor(private fb: FormBuilder,
              private plantelService: PlantelService,
              private predioService: PredioService,
              private partidoService: PartidoService,
              private deporteService: DeporteService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      this.tiposCancha = [];
      for (let cancha of res) {
        this.tiposCancha.push({
          label: cancha.nombre,
          value: cancha._id
        });
      }
    });
    this.predioService.getAllPredios().subscribe(predios => {
      console.log(predios);
      this.predios = predios;
    });
  }

  getPlanteles(event) {
    this.plantelLocal = event[0];
    this.plantelVisitante = event[1];
  }

  getUbicacionSeleccionada(event) {
    this.ubicacion.lat = event.lat();
    this.ubicacion.lng = event.lng();
    console.log(this.ubicacion);
  }

  getTipoCancha(event) {
    this.canchaSeleccionada = event;
    console.log(this.canchaSeleccionada);
  }

  getFecha(event) {
    this.fechaPartido = event;
    console.log(this.fechaPartido);
  }

  definirPredio(event) {
    this.selectedPredio = event;
    console.log(this.selectedPredio);
    this.displayDialog = false;
    this.mostrarLabel = true;
  }

  crearPartido() {
    console.log(this.canchaSeleccionada, this.fechaPartido);
    let cancha: any;
    // forkJoin(this.predioService.getCanchas(this.selectedPredio._id),
    forkJoin(this.predioService.getCanchas(),
      this.plantelService.createPlantel(this.plantelLocal, 'Local'),
      this.plantelService.createPlantel(this.plantelVisitante, 'Visitante')).subscribe(res => {
      cancha = res[0][0];
      const local = res[1];
      const visitante = res[2];
      this.partidoService.createPartido({
        deporte: this.canchaSeleccionada,
        grupoLocal: local,
        grupoVisitante: visitante,
        dia: this.fechaPartido,
        cancha: cancha._id,
        horasDeJuego: 1
      }).subscribe(partido => {
        this.router.navigateByUrl('/partido');
      });
    });
  }

  openDialog() {
    // this.fileNameDialogRef = this.dialog.open(MapComponent, {
    this.fileNameDialogRef = this.dialog.open(MapDialogComponent, {
      data: this.predios,
      width: '600px',
    });
  }
}

