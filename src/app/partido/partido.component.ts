import {Component, OnInit} from '@angular/core';
import {ConfirmationService, SelectItem} from 'primeng/api';
import {PlantelService} from 'services/plantelService';
import {Jugador} from '../models/jugador';
import {Plantel} from '../models/plantel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  providers: [ConfirmationService, PlantelService]
})

export class PartidoComponent implements OnInit {

  tiposCancha: SelectItem[];
  canchaSeleccionada: any;
  value: Date;
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
  ubicacion: any;
  resetForm = false;

  constructor(private plantelService: PlantelService,
              private router: Router,
              private confirmationService: ConfirmationService,) {
    this.tiposCancha = [
      {label: 'Futbol 5', value: 'Futbol 5'},
      {label: 'Futbol 7', value: 'Futbol 7'},
      {label: 'Futbol 11', value: 'Futbol 11'}
    ];

    this.plantelLocal = new Plantel('5b6e5ed68cbb1b4f61e0b9e4');
    this.plantelVisitante = new Plantel('5b786b8434d41f28d880bffd');
    this.localInvitados = false;
    this.visitanteInvitados = false;
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.ubicacion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      });
      console.log(this.ubicacion);
    }
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
    this.resetForm = !this.resetForm;
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
        // this.predioService.setUbicacion('5b5e5661b7e1c6236f5c733d', {"lat": ubicacion.lat(), "lng": ubicacion.lng()})
        this.addJugadorConfirmado(jugador, localia);
      },
      reject: () => {
        alert('No aceptado');
      }
    });
  }
}
