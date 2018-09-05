import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlantelService} from '../../../services/plantelService';
import {Plantel} from '../../models/plantel';
import {Router} from '@angular/router';
import {PartidoService} from '../../../services/partidoService';
import {ConfirmationService} from 'primeng/api';
import {Jugador} from '../../models/jugador';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Partido} from '../../models/partido';

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
  jugadoresAInvitar: Jugador[];
  resetForm = false;
  noIds = false;
  idPartido: string;
  idOrganizador: string;

  @Input()
  set setIdPartido(name: string) {
    this.idPartido = name;
  }
  @Output() sendPlantel: EventEmitter<Array<Plantel>> = new EventEmitter<Array<Plantel>>();

  constructor(private plantelService: PlantelService,
              private partidoService: PartidoService,
              private confirmationService: ConfirmationService,
              private router: Router) {
    this.localInvitados = false;
    this.visitanteInvitados = false;
  }

  ngOnInit() {
    console.log(this.idPartido);
    if (this.idPartido) {
      this.partidoService.getPartido(this.idPartido).subscribe(partido => {
        this.plantelLocal = partido.grupoLocal;
        this.plantelVisitante = partido.grupoVisitante;
        this.idOrganizador = partido.organizador._id;
        this.getJugadoresPlantel(this.plantelLocal, 'local');
        this.getJugadoresPlantel(this.plantelVisitante, 'visitante');
      });

      // this.partidoService.getPartido(this.idPartido).subscribe(partido => {
      //   debugger;
      //   forkJoin(this.plantelService.getPlantel(partido.grupoLocal),
      //     this.plantelService.getPlantel(partido.grupoVisitante)).subscribe(res => {
      //     this.plantelLocal = res[0];
      //     this.plantelVisitante = res[1];
      //     this.getJugadoresPlantel(this.plantelLocal, 'local');
      //     this.getJugadoresPlantel(this.plantelVisitante, 'visitante');
      //   });
      // });
    } else {
      console.log('else idpartido');
      this.noIds = true;
      this.plantelLocal = new Plantel();
      this.plantelVisitante = new Plantel();
    }
  }

  getJugadoresPlantel(plantel, condicion) {
    console.log('entro al getJugadoresPlantel');
    this.plantelService.getPlantel(plantel._id).subscribe(res => {
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
      let index: number = this.plantelLocal.jugadores.indexOf(jugador);
      if (!this.noIds) {
        return this.plantelService.addJugadorConfirmado(this.plantelLocal._id, jugador._id).subscribe(res => {
          this.plantelLocal.jugadoresConfirmados = res.jugadoresConfirmados;
          this.plantelLocal.jugadores.splice(index, 1);
          this.localSeleccionado = null;
        });
      } else {
        if (this.plantelLocal.jugadoresConfirmados.indexOf(jugador) === -1)
          this.plantelLocal.jugadoresConfirmados.push(jugador);
        this.plantelLocal.jugadores.splice(index, 1);
        this.localSeleccionado = null;
      }
    }

    if (localia === 'visitante') {
      const index: number = this.plantelVisitante.jugadores.indexOf(jugador);
      if (!this.noIds) {
        return this.plantelService.addJugadorConfirmado(this.plantelVisitante._id, this.visitanteSeleccionado._id).subscribe(res => {
          this.plantelVisitante.jugadoresConfirmados = res.jugadoresConfirmados;
          this.plantelVisitante.jugadores.splice(index, 1);
          this.visitanteSeleccionado = null;
        });
      } else {
        this.plantelVisitante.jugadoresConfirmados.push(jugador);
        this.plantelVisitante.jugadores.splice(index, 1);
        this.visitanteSeleccionado = null;
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

  confirm1(jugador, localia) {
    // if (this.idOrganizador === idSession)
    this.confirmationService.confirm({
      message: 'Invitar a ' + jugador.nombre + jugador.apellido + ' al partido?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('entrando...');
        this.addJugadorConfirmado(jugador, localia);
      },
      reject: () => {
      }
    });
  }

  remove(jugador, localia) {
    this.confirmationService.confirm({
      message: 'Eliminar a ' + jugador.nombre + jugador.apellido + ' del partido?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('entrando...');
        this.removeConfirmado(jugador, localia);
      },
      reject: () => {
      }
    });
  }
  removeConfirmado(jugador, localia) {
    if(localia === 'local') {
      const index: number = this.plantelLocal.jugadores.indexOf(jugador);
      this.plantelLocal.jugadoresConfirmados.splice(index, 1);
    }
    if(localia === 'visitante') {
      const index: number = this.plantelVisitante.jugadores.indexOf(jugador);
      this.plantelVisitante.jugadoresConfirmados.splice(index, 1);
    }
  }

  getJugadores(event) {
    this.traeJugadores = true;
    this.jugadoresAInvitar = event;
  }


  invitarJugadores() {
    if (this.localidad === 'local') {
      for (let j of this.jugadoresAInvitar) {
        console.log(this.plantelLocal.jugadores.indexOf(j));
        if (this.plantelLocal.jugadores.indexOf(j) === -1)
          this.plantelLocal.jugadores.push(j);
      }
    }
    if (this.localidad === 'visitante') {
      for (let j of this.jugadoresAInvitar) {
        this.plantelVisitante.jugadores.push(j);
      }
    }
    this.resetForm = !this.resetForm; // esto es para q entre en el onchanged del componente
  }
}
