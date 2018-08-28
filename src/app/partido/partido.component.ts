import {Component, OnInit} from '@angular/core';
import {ConfirmationService, SelectItem} from 'primeng/api';
import {PlantelService} from '../../services/plantelService';
import {Jugador} from '../models/jugador';
import {Plantel} from '../models/plantel';
import {Router} from '@angular/router';
import {PredioService} from '../../services/predioService';
import {Predio} from '../models/predio';
import {Partido} from '../models/partido';
import {PartidoService} from '../../services/partidoService';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeporteService} from '../../services/deporteService';
import {forkJoin} from 'rxjs/observable/forkJoin';


@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  providers: [ConfirmationService,
    PlantelService,
    PredioService,
    PartidoService,
    DeporteService]
})

export class PartidoComponent implements OnInit {

  form: FormGroup;
  tiposCancha: SelectItem[];
  predios: Predio[];
  selectedPredio: Predio;
  canchaSeleccionada: any;
  fechaPartido: Date;
  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  localSeleccionado: Jugador;
  visitanteSeleccionado: Jugador;
  localInvitados: boolean;
  visitanteInvitados: boolean;
  localidad: string;
  disabled = true;
  traeJugadores = false;
  jugadoresAInvitar: Array<Jugador>;
  displayDialog = false;
  resetForm = false;
  ubicacion = {
    lat: String,
    lng: String
  };

  constructor(private fb: FormBuilder,
              private plantelService: PlantelService,
              private predioService: PredioService,
              private partidoService: PartidoService,
              private deporteService: DeporteService,
              private router: Router,
              private confirmationService: ConfirmationService) {

    this.plantelLocal = new Plantel('5b6e5ed68cbb1b4f61e0b9e4');
    this.plantelVisitante = new Plantel('5b786b8434d41f28d880bffd');
    this.localInvitados = false;
    this.visitanteInvitados = false;
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
    // this.form = this.fb.group({
    //   canchaSeleccionada: null,
    //   fechaPartido: null
    // });
    this.predioService.getAllPredios().subscribe(predios => {
      this.predios = predios;
    });
    this.getJugadoresPlantel(this.plantelLocal, 'local');
    this.getJugadoresPlantel(this.plantelVisitante, 'visitante');
  }

  getJugadores(event) {
    this.traeJugadores = true;
    this.jugadoresAInvitar = event;
  }

  invitarJugadores() {
    if (this.localidad === 'local') {
      // this.plantelLocal.jugadores = this.jugadoresAInvitar;
      for (let j of this.jugadoresAInvitar) {
        this.plantelLocal.jugadores.push(j);
      }
    }
    if (this.localidad === 'visitante') {
      // this.plantelLocal.jugadores = this.jugadoresAInvitar;
      for (let j of this.jugadoresAInvitar) {
        this.plantelVisitante.jugadores.push(j);
      }
    }
    this.resetForm = !this.resetForm; // esto es para q entre en el onchanged del componente
  }

  getJugadoresPlantel(plantel, condicion) {
    this.plantelService.getPlantel(plantel.id).subscribe(res => {
      if (res.toString() === 'login') {
        return this.router.navigateByUrl('/login');
      }
      plantel.jugadores = res.jugadores;
      plantel.jugadoresConfirmados = res.jugadoresConfirmados;
      if (condicion === 'local' && res.jugadores.length > 0) {
        this.localInvitados = true;
      }
      if (condicion === 'visitante' && res.jugadores.length > 0) {
        this.visitanteInvitados = true;
      }
    });
  }

  addJugadorConfirmado(jugador, localia: string) {
    if (localia === 'local') {
      const index: number = this.plantelLocal.jugadores.indexOf(jugador);
      return this.plantelService.addJugadorConfirmado(this.plantelLocal.id, jugador._id).subscribe(res => {
        this.plantelLocal.jugadoresConfirmados = res.jugadoresConfirmados;
        this.plantelLocal.jugadores.splice(index, 1);
        this.localSeleccionado = null;
      });
    }
    if (localia === 'visitante') {
      const index: number = this.plantelVisitante.jugadores.indexOf(jugador);
      return this.plantelService.addJugadorConfirmado(this.plantelVisitante.id, this.visitanteSeleccionado._id).subscribe(res => {
        this.plantelVisitante.jugadoresConfirmados = res.jugadoresConfirmados;
        this.plantelVisitante.jugadores.splice(index, 1);
        this.visitanteSeleccionado = null;
      });
    }
  }

  activarComponent(localidad) {
    if (this.localidad !== localidad) {
      this.localidad = localidad;
      if (this.disabled === true)
        this.disabled = !this.disabled;
    }
  }

  confirm1(jugador, localia) {
    this.confirmationService.confirm({
      message: 'Invitar a ' + jugador.nombre + jugador.apellido + ' al partido?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('entrando...');
        // this.predioService.setUbicacion('5b5e5661b7e1c6236f5c733d', {"latitude": ubicacion.latitude(), "longitude": ubicacion.longitude()})
        this.addJugadorConfirmado(jugador, localia);
      },
      reject: () => {
        alert('No aceptado');
      }
    });
  }

  getUbicacionSeleccionada(event) {
    this.ubicacion.lat = event.lat();
    this.ubicacion.lng = event.lng();
    console.log(this.ubicacion);
  }

  definirPredio(event) {
    this.selectedPredio = event;
    console.log(this.selectedPredio);
    this.displayDialog = false;
  }

  crearPartido() {
    console.log(this.canchaSeleccionada, this.fechaPartido);
    let cancha: any;
    forkJoin(this.predioService.getCanchas(this.selectedPredio._id),
      this.plantelService.createPlantel(this.plantelLocal, 'Local'),
      this.plantelService.createPlantel(this.plantelVisitante, 'Visitante')).subscribe(res => {
      cancha = res[0][0];
      const local = res[1];
      const visitante = res[2];
      debugger;
      this.partidoService.createPartido({
        deporte: this.canchaSeleccionada,
        grupoLocal: local,
        grupoVisitante: visitante,
        dia: this.fechaPartido,
        cancha: cancha._id,
        horasDeJuego: 1
      }).subscribe(partido => {
        console.log('resultado', partido);
      });
    });
  }
}
