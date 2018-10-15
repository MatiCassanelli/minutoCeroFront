import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlantelService} from '../../../services/plantelService';
import {Plantel} from '../../models/plantel';
import {Router} from '@angular/router';
import {PartidoService} from '../../../services/partidoService';
import {ConfirmationService} from 'primeng/api';
import {Jugador} from '../../models/jugador';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Partido} from '../../models/partido';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MapDialogComponent} from '../map-dialog/map-dialog.component';
import {ConfirmDialogPlantelComponent} from '../confirm-dialog-plantel/confirm-dialog-plantel.component';

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
  partido: Partido;
  idOrganizador: string;
  dialogRef: MatDialogRef<ConfirmDialogPlantelComponent>;
  porcentajeCumplimiento: number;
  @Input()
  set setIdPartido(name: string) {
    this.idPartido = name;
  }
  @Output() sendPlantel: EventEmitter<Array<Plantel>> = new EventEmitter<Array<Plantel>>();

  constructor(private plantelService: PlantelService,
              private partidoService: PartidoService,
              private confirmationService: ConfirmationService,
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
      });
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
      if (!this.noIds) { // para cuando entro a un partido ya organizado a invitar nuevos jugadores
        return this.plantelService.confirmarJugador(this.plantelLocal._id, [jugador._id]).subscribe(res => {
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
        return this.plantelService.confirmarJugador(this.plantelVisitante._id, [jugador._id]).subscribe(res => {
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

  openDialog(j, localia, accion) {
    // this.fileNameDialogRef = this.dialog.open(MapComponent, {
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
          console.log(jc);
          this.removeConfirmado(jc, localia);
        }

      });
  }

  removeConfirmado(jugador, localia) {
    if (localia === 'local') {
      let index: number = this.plantelLocal.jugadoresConfirmados.indexOf(jugador);
      if (!this.noIds) { // para cuando entro a un partido ya organizado a invitar nuevos jugadores
        return this.plantelService.updatePlantel(this.plantelLocal._id, [jugador._id]).subscribe(() => {
          this.plantelLocal.jugadoresConfirmados.splice(index, 1);
        });
      } else {
        this.plantelLocal.jugadoresConfirmados.splice(index, 1);
      }
    }
    if (localia === 'visitante') {
      let index: number = this.plantelVisitante.jugadoresConfirmados.indexOf(jugador);
      if (!this.noIds) {
        this.plantelService.updatePlantel(this.plantelVisitante._id, [jugador._id]).subscribe(() => {
          this.plantelVisitante.jugadoresConfirmados.splice(index, 1);
        });
      } else {
        this.plantelVisitante.jugadoresConfirmados.splice(index, 1);
      }
    }
  }

  getJugadores(event) {
    this.traeJugadores = true;
    this.jugadoresAInvitar = event;
    for (let i of event) {
      if(this.plantelLocal.jugadores.find(x => x._id === i._id) ||
        this.plantelLocal.jugadoresConfirmados.find(x => x._id === i._id) ||
        this.plantelVisitante.jugadores.find(x => x._id === i._id) ||
        this.plantelVisitante.jugadoresConfirmados.find(x => x._id === i._id))
        this.jugadoresAInvitar.splice(this.jugadoresAInvitar.indexOf(i), 1);
    }
  }


  invitarJugadores() {
    if (this.localidad === 'local') {
      if (this.noIds){
        for(let j of this.jugadoresAInvitar)
          this.plantelLocal.jugadores.push(j);
      }
      else {
        this.plantelService.updatePlantel(this.plantelLocal._id, null, this.jugadoresAInvitar).subscribe(res => {
          this.plantelLocal.jugadores = res.jugadores;
        });
      }
      this.jugadoresAInvitar = [];
    }
    if (this.localidad === 'visitante') {
      if (this.noIds){
        for(let j of this.jugadoresAInvitar)
          this.plantelVisitante.jugadores = this.jugadoresAInvitar;
      }
      else {
        this.plantelService.updatePlantel(this.plantelVisitante._id, null, this.jugadoresAInvitar).subscribe(res => {
          this.plantelVisitante.jugadores = res.jugadores;
        });
      }
      this.jugadoresAInvitar = [];
    }
    this.sendPlantel.emit([this.plantelLocal, this.plantelVisitante]);
    this.resetForm = !this.resetForm; // esto es para q entre en el onchanged del componente
  }
}
