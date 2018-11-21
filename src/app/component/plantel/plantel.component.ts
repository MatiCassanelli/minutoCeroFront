import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlantelService} from '../../../services/plantelService';
import {Plantel} from '../../models/plantel';
import {Router} from '@angular/router';
import {PartidoService} from '../../../services/partidoService';
import {Jugador} from '../../models/jugador';
import {Partido} from '../../models/partido';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogPlantelComponent} from '../confirm-dialog-plantel/confirm-dialog-plantel.component';
import {EquipoService} from '../../../services/equipoService';
import {JugadorService} from '../../../services/jugadorService';
import * as socketIo from "socket.io-client";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-plantel',
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.css']
})
export class PlantelComponent implements OnInit {


  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  localSeleccionado: Jugador;
  visitanteSeleccionado: Jugador;
  localInvitados: boolean;
  visitanteInvitados: boolean;
  localidad: string;
  disabled = true;
  traeJugadores = false;
  jugadoresAInvitar: Jugador[] = [];
  resetForm = false;
  noIds = false;
  idPartido: string;
  partido: Partido;
  idOrganizador: string;
  dialogRef: MatDialogRef<ConfirmDialogPlantelComponent>;
  invitacionEquipo = false;
  tieneEquipo = false;
  jugadoresEquipo: Jugador[] = [];
  clickedLocal = false;
  clickedVisitante = false;
  confirmado = false;
  invitado = false;
  confirmarLocal = true;
  confirmarVisitante = true;
  @Input() maximoPorEquipo: number;

  @Input()
  set setIdPartido(name: string) {
    this.idPartido = name;
  }

  @Output() sendPlantel: EventEmitter<Array<Plantel>> = new EventEmitter<Array<Plantel>>();
  @Output() jugadorSumado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editable = true;

  constructor(private plantelService: PlantelService,
              private partidoService: PartidoService,
              private equipoService: EquipoService,
              private jugadorService: JugadorService,
              private router: Router,
              private dialog: MatDialog) {
    this.localInvitados = false;
    this.visitanteInvitados = false;
  }

  ngOnInit() {
    if (this.idPartido) {
      this.partidoService.getPartido(this.idPartido).subscribe(partido => {
        this.partido = partido;
        this.plantelLocal = partido.grupoLocal;
        this.plantelVisitante = partido.grupoVisitante;
        this.idOrganizador = partido.organizador._id;
        this.getJugadoresPlantel(this.plantelLocal, 'local');
        this.getJugadoresPlantel(this.plantelVisitante, 'visitante');
        this.confirmarLocal = !(this.plantelLocal.jugadoresConfirmados.length === this.maximoPorEquipo);
        this.confirmarVisitante = !(this.plantelVisitante.jugadoresConfirmados.length === this.maximoPorEquipo);
        this._abrirSocket(partido._id);
      });
    } else {
      this.noIds = true;
      this.plantelLocal = new Plantel();
      this.plantelVisitante = new Plantel();
      this.jugadorService.getJugadorById(localStorage.getItem('id')).subscribe(j => {
        this.plantelLocal.jugadoresConfirmados.push(j[0]);
        this.confirmado = true;
        this.sendPlantel.emit([this.plantelLocal, this.plantelVisitante]);
      });
    }
    this.equipoService.getMiEquipo().subscribe(res => {
      if (res) {
        this.tieneEquipo = true;
        for (let j of res[0].jugadores) {
          this.jugadorService.getJugadorById(j.toString()).subscribe(jug => {
            this.jugadoresEquipo.push(jug[0]);
          });
        }
      }
    });
  }

  getJugadoresPlantel(plantel, condicion) {
    this.plantelService.getPlantel(plantel._id).subscribe(res => {
      if (res.toString() === 'login') {
        return this.router.navigateByUrl('/login');
      }
      plantel.jugadores = res.jugadores;
      plantel.jugadoresConfirmados = res.jugadoresConfirmados;
      if (plantel.jugadoresConfirmados.find(x => x._id === localStorage.getItem('id')))
        this.confirmado = true;
      else if (plantel.jugadores.find(x => x._id === localStorage.getItem('id')))
        this.invitado = true;
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
      let index: number = this.plantelLocal.jugadores.indexOf(jugador);
      if (!this.noIds) { // para cuando entro a un partido ya organizado a invitar nuevos jugadores
        return this.plantelService.confirmarJugador(this.plantelLocal._id, [jugador._id]).subscribe(res => {
          this.plantelLocal.jugadoresConfirmados = res.jugadoresConfirmados;
          this.plantelLocal.jugadores.splice(index, 1);
          this.localSeleccionado = null;
          this.deshabilitarConfirmar(localia);
        });
      } else {
        if (this.plantelLocal.jugadoresConfirmados.indexOf(jugador) === -1)
          this.plantelLocal.jugadoresConfirmados.push(jugador);
        this.plantelLocal.jugadores.splice(index, 1);
        this.localSeleccionado = null;
        this.deshabilitarConfirmar(localia);
      }
    }

    if (localia === 'visitante') {
      const index: number = this.plantelVisitante.jugadores.indexOf(jugador);
      if (!this.noIds) {
        return this.plantelService.confirmarJugador(this.plantelVisitante._id, [jugador._id]).subscribe(res => {
          this.plantelVisitante.jugadoresConfirmados = res.jugadoresConfirmados;
          this.plantelVisitante.jugadores.splice(index, 1);
          this.visitanteSeleccionado = null;
          this.deshabilitarConfirmar(localia);
        });
      } else {
        this.plantelVisitante.jugadoresConfirmados.push(jugador);
        this.plantelVisitante.jugadores.splice(index, 1);
        this.visitanteSeleccionado = null;
        this.deshabilitarConfirmar(localia);
      }
    }
    this.sendPlantel.emit([this.plantelLocal, this.plantelVisitante]);
  }

  activarComponent(localidad) {
    if (this.localidad !== localidad) {
      this.localidad = localidad;
      if (this.disabled === true)
        this.disabled = !this.disabled;
    }
  }

  openDialog(j, localia, accion) {
    // this.fileNameDialogRef = this.dialog.open(MapComponent, {
    if (this.plantelLocal.jugadoresConfirmados.indexOf(j) !== 0) {
      this.dialogRef = this.dialog.open(ConfirmDialogPlantelComponent, {
        data: {
          jugador: j,
          localia: localia,
          accion: accion //if en el otro componennt para eliminar o agregar
        },
        width: '600px',
        maxWidth: null,
      });
      this.dialogRef.afterClosed().subscribe((jc) => {
        if (jc && accion === 'confirm')
          this.addJugadorConfirmado(jc, localia);
        if (jc && accion === 'remove') {
          this.removeConfirmado(jc, localia);
        }

      });
    }
  }

  removeConfirmado(jugador, localia) {
    if (localia === 'local') {
      let index: number = this.plantelLocal.jugadoresConfirmados.indexOf(jugador);
      if (!this.noIds) { // para cuando entro a un partido ya organizado a invitar nuevos jugadores
        return this.plantelService.updatePlantel(this.plantelLocal._id, [jugador._id]).subscribe(() => {
          this.plantelLocal.jugadoresConfirmados.splice(index, 1);
          this.deshabilitarConfirmar('local');
        });
      } else {
        this.plantelLocal.jugadoresConfirmados.splice(index, 1);
        this.deshabilitarConfirmar('local');
      }
    }
    if (localia === 'visitante') {
      let index: number = this.plantelVisitante.jugadoresConfirmados.indexOf(jugador);
      if (!this.noIds) {
        this.plantelService.updatePlantel(this.plantelVisitante._id, [jugador._id]).subscribe(() => {
          this.plantelVisitante.jugadoresConfirmados.splice(index, 1);
          this.deshabilitarConfirmar('visitante');
        });
      } else {
        this.plantelVisitante.jugadoresConfirmados.splice(index, 1);
        this.deshabilitarConfirmar('visitante');
      }
    }
  }

  getJugadores(event) {
    this.jugadoresAInvitar = event;
    for (let i of this.jugadoresAInvitar) {
      if (this.plantelLocal.jugadores.find(x => x._id === i._id) ||
        this.plantelLocal.jugadoresConfirmados.find(x => x._id === i._id) ||
        this.plantelVisitante.jugadores.find(x => x._id === i._id) ||
        this.plantelVisitante.jugadoresConfirmados.find(x => x._id === i._id) ||
        !this.jugadoresAInvitar.find(x => x._id === i._id))
        this.jugadoresAInvitar.splice(this.jugadoresAInvitar.indexOf(i), 1);
    }
    this.traeJugadores = true;
  }


  invitarJugadores() {
    if (this.localidad === 'local') {
      if (this.noIds) {
        for (let j of this.jugadoresAInvitar)
          this.plantelLocal.jugadores.push(j);
      } else {
        this.plantelService.updatePlantel(this.plantelLocal._id, null, this.jugadoresAInvitar).subscribe(res => {
          if (res)
            this.plantelLocal.jugadores = res.jugadores;
        });
      }
      this.jugadoresAInvitar = [];
    }
    if (this.localidad === 'visitante') {
      if (this.noIds) {
        for (let j of this.jugadoresAInvitar)
          this.plantelVisitante.jugadores.push(j);
      } else {
        this.plantelService.updatePlantel(this.plantelVisitante._id, null, this.jugadoresAInvitar).subscribe(res => {
          if (res)
            this.plantelVisitante.jugadores = res.jugadores;
        });
      }
      this.jugadoresAInvitar = [];
    }
    this.sendPlantel.emit([this.plantelLocal, this.plantelVisitante]);
    this.resetForm = !this.resetForm; // esto es para q entre en el onchanged del componente de invitar
  }

  invitarEquipo() {
    this.invitacionEquipo = !this.invitacionEquipo;
    if (this.invitacionEquipo) {
      for (let i of this.jugadoresEquipo) { // si no esta en ningun plantel
        if (!(this.plantelLocal.jugadores.find(x => x._id === i._id) ||
          this.plantelLocal.jugadoresConfirmados.find(x => x._id === i._id) ||
          this.plantelVisitante.jugadores.find(x => x._id === i._id) ||
          this.plantelVisitante.jugadoresConfirmados.find(x => x._id === i._id)) &&
          !this.jugadoresAInvitar.find(x => x._id === i._id))
          this.jugadoresAInvitar.push(i);
      }
      this.invitacionEquipo = true;
    } else {
      if (this.jugadoresEquipo.length > 0) {  // elimina de plantel los jugadores del equipo
        if (this.localidad === 'local') {
          this.plantelLocal.jugadores = this.plantelLocal.jugadores.filter(x => this.jugadoresEquipo.indexOf(x) < 0);
        } else if (this.localidad === 'visitante') {
          this.plantelVisitante.jugadores = this.plantelVisitante.jugadores.filter(x => this.jugadoresEquipo.indexOf(x) < 0);
        }
      }
      this.invitacionEquipo = false;
      // this.jugadoresEquipo = [];
    }
  }

  sumarsePartido() {
    if (this.localidad === 'local'){
      this.plantelService.confirmarJugador(this.plantelLocal._id, [localStorage.getItem('id')], null).subscribe(res => {
        this.plantelLocal.jugadoresConfirmados = res.jugadoresConfirmados;
        this.confirmado = true;
        this.deshabilitarConfirmar('local');
      });
    } else if (this.localidad === 'visitante') {
      this.plantelService.confirmarJugador(this.plantelVisitante._id, [localStorage.getItem('id')], null).subscribe(res => {
        this.plantelVisitante.jugadoresConfirmados = res.jugadoresConfirmados;
        this.confirmado = true;
        this.deshabilitarConfirmar('visitante');
      });
    }
    this.jugadorSumado.emit(true);
  }

  abandonarPartido() {
    const esLocal = this.plantelLocal.jugadoresConfirmados.find(x => x._id === localStorage.getItem('id'));
    const esVisitante = this.plantelVisitante.jugadoresConfirmados.find(x => x._id === localStorage.getItem('id'));
    if (esLocal)
      this.plantelService.abandonarPartido(this.plantelLocal._id, localStorage.getItem('id')).subscribe(() => {
        this.plantelLocal.jugadoresConfirmados.splice(this.plantelLocal.jugadoresConfirmados.indexOf(esLocal), 1);
        this.confirmado = false;
        this.deshabilitarConfirmar('local');
      });
    if (esVisitante)
      this.plantelService.abandonarPartido(this.plantelVisitante._id, localStorage.getItem('id')).subscribe(res => {
        this.plantelVisitante.jugadoresConfirmados.splice(this.plantelVisitante.jugadoresConfirmados.indexOf(esLocal), 1);
        this.confirmado = false;
        this.deshabilitarConfirmar('visitante');
      });
  }

  private _abrirSocket(idPartido) {
    const socket = socketIo(environment.socketUrl);
    socket.on('Partido' + idPartido, (data) => {
      if(data.Aceptado) {
        if(this.plantelLocal.jugadores.includes(data.Aceptado)){
          this.plantelLocal.jugadoresConfirmados.push(data.Aceptado);
          this.plantelLocal.jugadores.splice(this.plantelLocal.jugadores.indexOf(data.Aceptado), 1);
        } else {
          this.plantelVisitante.jugadoresConfirmados.push(data.Aceptado);
          this.plantelVisitante.jugadores.splice(this.plantelVisitante.jugadores.indexOf(data.Aceptado), 1);
        }
      } else if (data.Rechazado) {
        if(this.plantelLocal.jugadores.includes(data.Rechazado)){
          this.plantelLocal.jugadores.splice(this.plantelLocal.jugadores.indexOf(data.Rechazado), 1);
        } else {
          this.plantelVisitante.jugadores.splice(this.plantelVisitante.jugadores.indexOf(data.Rechazado), 1);
        }
      }
    });
  }

  deshabilitarConfirmar(condicion) {
    if(condicion === 'local') {
      this.confirmarLocal = !(this.plantelLocal.jugadoresConfirmados.length === this.maximoPorEquipo);
    }
    if(condicion === 'visitante') {
      this.confirmarVisitante = !(this.plantelVisitante.jugadoresConfirmados.length === this.maximoPorEquipo);
    }
  }
}


