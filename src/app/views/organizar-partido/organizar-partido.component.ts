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
import {Cancha} from '../../models/cancha';


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
  predios: any;
  selectedPredio: Predio;
  canchaSeleccionada: Cancha;
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
  abrirMapa = false;

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

    this.plantelLocal = new Plantel();
    this.plantelVisitante = new Plantel();
  }

  getPlanteles(event) {
    this.plantelLocal = event[0];
    this.plantelVisitante = event[1];
    const cantLocal = this.plantelLocal.jugadoresConfirmados.length || 0;
    const cantVisitante = this.plantelVisitante.jugadoresConfirmados.length || 0;
    if (!this.deporte)
      this.porcentajeOcupacion = 0;
    else
      this.porcentajeOcupacion = (cantLocal + cantVisitante) / this.deporte.cantJugadores * 100;
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

  crearPartido() {
    forkJoin(this.plantelService.createPlantel(this.plantelLocal.jugadoresConfirmados, 'Local', this.deporte.cantJugadores / 2),
      this.plantelService.createPlantel(this.plantelVisitante.jugadoresConfirmados, 'Visitante', this.deporte.cantJugadores / 2)).subscribe(res => {
      let local = res[0];
      let visitante = res[1];
      this.partidoService.createPartido({
        deporte: this.deporte._id,
        grupoLocal: local,
        grupoVisitante: visitante,
        dia: this.fechaPartido,
        cancha: this.canchaSeleccionada,
        horasDeJuego: 1
      }).subscribe(() => {
        forkJoin(this.plantelService.updatePlantel(local._id, null, this.plantelLocal.jugadores),
          this.plantelService.updatePlantel(visitante._id, null, this.plantelVisitante.jugadores)).subscribe(() => {
          this.reservaService.createReserva({
            estado: 'PreReserva',
            dia: this.fechaPartido,
            cancha: this.canchaSeleccionada,
            jugador: localStorage.getItem('id')
          }).subscribe(reserva => {
            this.router.navigateByUrl('/jugador');
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
        if (res.predio) {
          this.selectedPredio = res.predio.predio;
          this.canchaSeleccionada = res.predio.cancha;
          this.mostrarLabel = true;
        }
      }
    });
  }

  getPredioConDisponibilidad() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
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

