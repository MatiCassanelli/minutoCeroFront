import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartidoService} from '../../../services/partidoService';
import {Partido} from '../../models/partido';
import {PredioService} from '../../../services/predioService';
import {Predio} from '../../models/predio';
import {Plantel} from '../../models/plantel';
import {PlantelService} from '../../../services/plantelService';
import {ConfirmationService} from 'primeng/api';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MapDialogComponent} from '../../component/map-dialog/map-dialog.component';
import {JugadorService} from '../../../services/jugadorService';
import {ReservaService} from '../../../services/reservaService';
import {Reserva} from '../../models/reserva';
import {DeporteService} from '../../../services/deporteService';
import {Cancha} from '../../models/cancha';
import {PlantelComponent} from '../../component/plantel/plantel.component';
import * as socketIo from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {ConfirmDialogComponent} from '../../component/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';

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
  predios: Predio[];
  canchaSeleccionada: Cancha;
  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  fileNameDialogRef: MatDialogRef<MapDialogComponent>;
  editable: boolean;
  titulo: string;
  reelegirPredio = false;
  mostrarBoton = false;
  abandonar = false;
  clickAbandonar = false;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild('appPlantel') appPlantel: PlantelComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private jugadorService: JugadorService,
              private partidoService: PartidoService,
              private plantelService: PlantelService,
              private predioService: PredioService,
              private reservaService: ReservaService,
              private deporteService: DeporteService,
              private dialog: MatDialog,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idPartido = params.id;
      this.reelegirPredio = params.reelegir;
      this.partidoService.getPartido(this.idPartido).subscribe(partido => {
        if (partido) {
          if (partido.organizador.toString() === localStorage.getItem('id'))
            this.mostrarBoton = true;
          this.partido = partido;
          this.titulo = 'Partido';
          this.editable = (localStorage.getItem('id') === this.partido.organizador.toString());
          if (!this.reelegirPredio)
            this.getPredio(partido.cancha);
          else {
            this._getPrediosConDisponibilidad(partido.deporte._id, partido.dia);
          }
          this.plantelLocal = partido.grupoLocal;
          this.plantelVisitante = partido.grupoVisitante;
          if ((partido.grupoLocal.jugadoresConfirmados.find(x => x.toString() === localStorage.getItem('id')) ||
            partido.grupoVisitante.jugadoresConfirmados.find(x => x.toString() === localStorage.getItem('id'))) &&
            partido.organizador.toString() !== localStorage.getItem('id')) {
            this.abandonar = true;
          }
        } else {
          this.reservaService.getReservaById(this.idPartido).subscribe(res => {
            if (res.jugador.toString() === localStorage.getItem('id'))
              this.mostrarBoton = true;
            this.reserva = res;
            this.titulo = 'Reserva';
            let idDeporte = '';
            this.deporteService.getDeporteById(res.cancha.deporte.toString()).subscribe(dep => {
              this.reserva.cancha.deporte = dep.nombre;
              idDeporte = dep._id;
              if (!this.reelegirPredio)
                this.getPredio(res.cancha);
              else {
                this._getPrediosConDisponibilidad(idDeporte, res.dia);
              }
            });
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

  // getPlanteles(event) {
  //   this.plantelLocal = event[0];
  //   this.plantelVisitante = event[1];
  // }

  openDialog() {
    // this.fileNameDialogRef = this.dialog.open(MapComponent, {
    this.fileNameDialogRef = this.dialog.open(MapDialogComponent, {
      data: this.predio || this.predios,
      width: '600px',
      maxWidth: null,
    });
    this.fileNameDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.predio) {
          this.predio = res.predio.predio;
          this.canchaSeleccionada = res.predio.cancha;
          if (this.partido)
            this.partidoService.updateCancha(this.partido._id, this.canchaSeleccionada).subscribe(res2 => {
              console.log(res2);
            });
          else {
            if (this.reserva)
              this.reservaService.updateCancha(this.reserva._id, this.canchaSeleccionada).subscribe(res2 => {
                console.log(res2);
              });
          }
        }
      }
    });
  }

  private cancelarReserva(reserva) {
    if (this.partido) {  // es reserva entonces
      this.partidoService.cancelarPartido(reserva._id).subscribe(res => {
        // this.router.navigateByUrl('/jugador/misReservas');
        this.location.back();
      });
    } else if (this.reserva) {
      this.reservaService.cancelarReserva(reserva._id).subscribe((res) => {
        this.reserva.estado = 'Cancelada';
        this.location.back();
      });
    }
  }

  setAbandonar(event) {
    this.abandonar = event;
  }

  abandonarPartido() {
    this.appPlantel.abandonarPartido();
    this.abandonar = false;
  }

  private _getPrediosConDisponibilidad(deporte, dia) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('Hay geoposicion');
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.predioService.getPredioConDisponibilidad(deporte, 30, latitude, longitude, dia).subscribe(predios => {
          this.predios = predios;
        });
      }, error => {
        console.log('no geo');
        const latitude = -31.416798;
        const longitude = -64.183674;
        this.predioService.getPredioConDisponibilidad(deporte, 30, latitude, longitude, dia).subscribe(predios => {
          this.predios = predios;
        });
      });
    }
  }

  showConfirmDialog(idReserva) {
    this.confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      maxWidth: null
    });
    this.confirmDialog.afterClosed().subscribe(res => {
      if (res && res.respuesta === 'Aceptar')
        this.cancelarReserva(idReserva);
    });
  }
}
