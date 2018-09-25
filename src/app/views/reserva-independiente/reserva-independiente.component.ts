import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfirmationService, SelectItem} from 'primeng/api';
import {Predio} from '../../models/predio';
import {Plantel} from '../../models/plantel';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MapDialogComponent} from '../../component/map-dialog/map-dialog.component';
import {PlantelService} from '../../../services/plantelService';
import {PredioService} from '../../../services/predioService';
import {PartidoService} from '../../../services/partidoService';
import {DeporteService} from '../../../services/deporteService';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs/observable/forkJoin';
import { AmazingTimePickerService } from 'amazing-time-picker';
import * as moment from 'moment';
import {ReservaService} from '../../../services/reservaService';



@Component({
  selector: 'app-reserva-independiente',
  templateUrl: './reserva-independiente.component.html',
  styleUrls: ['./reserva-independiente.component.css'],
  providers: [ConfirmationService,
    PlantelService,
    PredioService,
    PartidoService,
    DeporteService,
  AmazingTimePickerService,
  ReservaService]
})
export class ReservaIndependienteComponent implements OnInit {

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
  fileNameDialogRef: MatDialogRef<MapDialogComponent>;
  public selectedTime: string;
  constructor(private fb: FormBuilder,
              private plantelService: PlantelService,
              private predioService: PredioService,
              private partidoService: PartidoService,
              private deporteService: DeporteService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private dialog: MatDialog,
              private atp: AmazingTimePickerService,
              private reservaService: ReservaService) {
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

  open() {
    const now = moment();
    // var now = moment(date.getDate().toString() + ' ' + date.getTime());
    now.add(30, 'minutes').startOf('hour');
    const h = now.toDate().getHours().toString();
    let m = now.toDate().getMinutes();
    if (m < 10)
      m*=10;
    let m1 = m.toString();
    const amazingTimePicker = this.atp.open({time: h + ':' + m1});
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }

  getTipoCancha(event) {
    this.canchaSeleccionada = event;
    console.log(this.canchaSeleccionada);
  }

  getFecha(event) {
    this.fechaPartido = event;
    console.log(this.fechaPartido);
  }

  crearPartido() {
    console.log(this.canchaSeleccionada, this.fechaPartido);
    let cancha: any;
    // forkJoin(this.predioService.getCanchas(this.selectedPredio._id),
    this.predioService.getCanchasWithPredio(this.selectedPredio._id).subscribe(res => {
      cancha = res[0];
      this.partidoService.createPartido({
        deporte: this.canchaSeleccionada,
        dia: this.fechaPartido,
        cancha: cancha._id,
        horasDeJuego: 1
      }).subscribe(() => {
        this.reservaService.createReserva({
          estado: 'Solicitada',
          dia: this.fechaPartido,
          cancha: cancha._id
        }).subscribe(reserva => {
          console.log('reserva', reserva);
          this.router.navigateByUrl('/partido');
        });
      });
    });
  }

  openDialog() {
    this.fileNameDialogRef = this.dialog.open(MapDialogComponent, {
      data: this.predios,
      width: '600px',
    });
    this.fileNameDialogRef.afterClosed().subscribe((res) => {
      if(res) {
        this.ubicacion = res.ubicacion;
        this.selectedPredio = res.predio;
      }

    });
  }
}