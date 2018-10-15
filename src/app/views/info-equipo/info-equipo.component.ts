import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EquipoService} from '../../../services/equipoService';
import {Equipo} from '../../models/equipo';
import {Jugador} from '../../models/jugador';
import {JugadorService} from '../../../services/jugadorService';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ConfirmDialogPlantelComponent} from '../../component/confirm-dialog-plantel/confirm-dialog-plantel.component';
import {ConfirmUbicacionDialogComponent} from '../registro-predio-mapa/registro-predio-mapa.component';
import {NotificacionService} from '../../../services/notificacionService';

@Component({
  selector: 'app-info-equipo',
  templateUrl: './info-equipo.component.html',
  styleUrls: ['./info-equipo.component.css'],
  providers: [EquipoService, JugadorService, MatSnackBar]
})
export class InfoEquipoComponent implements OnInit {

  jugadores: Array<Jugador>;
  jugadoresPorInvitar: Jugador[];
  capitan: Jugador;
  routeSub: any;
  equipo: Equipo;
  @Input() id: string;
  display: boolean;
  dialogRef: MatDialogRef<DialogInvitarJugadorEquipoComponent>;

  constructor(private route: ActivatedRoute,
              private equipoService: EquipoService,
              private jugadorService: JugadorService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params.id;
        console.log(this.id);
        this.equipoService.getEquipo(this.id).subscribe(eq => {
          this.equipo = eq[0];
          this.jugadorService.getJugadorById(this.equipo.capitan).toPromise().then(cap => {
            this.capitan = cap[0];
          });
          this.jugadores = this.getJugadoresOfEquipo(this.equipo.jugadores);
          console.log(this.equipo.capitan);
        });
      } else {
        this.equipoService.getMiEquipo().subscribe(eq => {
          this.equipo = eq[0];
          this.jugadorService.getJugadorById(this.equipo.capitan).toPromise().then(cap => {
            this.capitan = cap[0];
          });
          this.jugadores = this.getJugadoresOfEquipo(this.equipo.jugadores);
          console.log(this.equipo.capitan);
        });
      }
    });
    this.display = false;
  }

  ngOnInit() {
  }

  showDialog() {
    let refresh = false;
    this.dialogRef = this.dialog.open(DialogInvitarJugadorEquipoComponent, {
      width: '600px',
    });
    this.dialogRef.beforeClose().subscribe((jugadoresInvitar) => {
      let jug = [];
      if (jugadoresInvitar) {
        for (let a of jugadoresInvitar) {
          jug.push(a._id);
        }
        this.equipoService.invitarJugadores({
          jugadores: jug
        }, this.equipo._id).subscribe(resp => {
          refresh = true;
          this.equipo = resp;
        }, error1 => console.log(error1));
      }
    });
    this.dialogRef.afterClosed().subscribe(res => {
      if (refresh) {
        this.snackBar.open('Invitación enviada', '', {
          duration: 750,
        });
      }

    });
  }

  getJugadoresOfEquipo(jugadores): Array<Jugador> {
    let array = [];
    for (let jug of jugadores) {
      if (jug !== this.equipo.capitan) {
        this.jugadorService.getJugadorById(jug).subscribe(resp => {
          array.push(resp[0]);
        });
      }
    }
    console.log(array);
    return array;
  }
}

@Component({
  selector: 'app-dialog-invitar-jugador-equipo',
  template: `<h1 mat-dialog-title>Invitar jugadores</h1>
  <mat-dialog-content>
    <app-invitar-jugadores [queTraer]="'Jugadores'" (notifyParent)="getJugadores($event)"></app-invitar-jugadores>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button type="button" mat-dialog-close>Cancelar</button>
    <button mat-button type="submit" (click)="submit()">Aceptar</button>
  </mat-dialog-actions>`
})
export class DialogInvitarJugadorEquipoComponent implements OnInit {

  jugadoresInvitar: Jugador[] = [];
  constructor(private dialogRef: MatDialogRef<DialogInvitarJugadorEquipoComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  getJugadores(event) {
    this.jugadoresInvitar = event;
  }

  submit() {
    if (this.jugadoresInvitar.length > 0)
      this.dialogRef.close(this.jugadoresInvitar);
    else
      this.dialogRef.close();
  }

}
