import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
import {AmazingTimePickerService} from 'amazing-time-picker';
import * as moment from 'moment';
import {ReservaService} from '../../../services/reservaService';
import {Deporte} from '../../models/deporte';
import {Cancha} from '../../models/cancha';


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
  deporte: Deporte;
  deportes: Deporte[];
  predios: any;
  selectedPredio: Predio;
  canchaSeleccionada: Cancha;
  fechaPartido: Date;
  ubicacion = {
    lat: String,
    lng: String
  };
  mostrarLabel = false;
  fileNameDialogRef: MatDialogRef<MapDialogComponent>;
  public selectedTime: string;
  date = new FormControl(new Date());
  abrirMapa = false;

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
      // this.tiposCancha = [];
      this.deportes = res;
    });
  }

  open() {
    const start = moment();
    const remainder = 60 - (start.minute() % 60);

    let dateTime = moment(start).add(remainder, 'minutes');
    const amazingTimePicker = this.atp.open({time: dateTime.format('HH:mm')});
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }

  getTipoCancha(event) {
    // this.canchaSeleccionada = event;
    this.deporte = this.deportes.find(x => x._id === event);
    if (this.deporte && this.fechaPartido)
      this.getPredioConDisponibilidad();
  }

  getFecha(event) {
    this.fechaPartido = event;
    if (this.deporte && this.fechaPartido)
      this.getPredioConDisponibilidad();
  }

  reservar() {
    this.reservaService.createReserva({
      estado: 'Solicitada',
      jugador: localStorage.getItem('id'),
      dia: this.fechaPartido,
      cancha: this.canchaSeleccionada
    }).subscribe(reserva => {
      this.router.navigateByUrl('/partido');
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
        this.selectedPredio = res.predio.predio;
        this.canchaSeleccionada = res.predio.cancha;
        this.mostrarLabel = true;
      }
    });
  }

  getPredioConDisponibilidad() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('Hay geoposicion');
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.predioService.getPredioConDisponibilidad(this.deporte._id, 30, latitude, longitude, this.fechaPartido).subscribe(predios => {
          this.predios = predios;
          this.abrirMapa = true;
        });
      }, error => {
        console.log('no geo');
        const latitude = -31.416798;
        const longitude = -64.183674;
        this.predioService.getPredioConDisponibilidad(this.deporte._id, 30, latitude, longitude, this.fechaPartido).subscribe(predios => {
          this.predios = predios;
          this.abrirMapa = true;
        });
      });
    }
  }
}
