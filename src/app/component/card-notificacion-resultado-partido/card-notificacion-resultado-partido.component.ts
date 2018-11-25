import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {PartidoService} from '../../../services/partidoService';
import {Partido} from '../../models/partido';
import {Predio} from '../../models/predio';
import {PredioService} from '../../../services/predioService';
import {Jugador} from '../../models/jugador';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogInvitarJugadorEquipoComponent} from '../../views/info-equipo/info-equipo.component';

@Component({
  selector: 'app-card-notificacion-resultado-partido',
  templateUrl: './card-notificacion-resultado-partido.component.html',
  styleUrls: ['./card-notificacion-resultado-partido.component.css']
})
export class CardNotificacionResultadoPartidoComponent implements OnInit {

  partido: Partido;
  predio: Predio;
  mostrarBotones = false;
  golesLocal: number;
  golesVisitante: number;
  @Input() idPartido: string;
  @Input() mensaje: string;
  dialogRef: MatDialogRef<DialogResultadoComponent>;
  @Output() swipe: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private partidoService: PartidoService,
              private predioService: PredioService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.partidoService.getPartido(this.idPartido).subscribe(res => {
      this.partido = res;
      this.predioService.getPredio(this.partido.cancha.predio).subscribe(rta => {
        this.predio = rta;
      });
    });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogResultadoComponent, {
      width: '600px',
      maxWidth: null,
      data: {
        partido: this.partido,
        predio: this.predio
      }
    });
    this.dialogRef.beforeClose().subscribe((asd) => {
      if(asd && asd.resultado){
        this.partidoService.updateResultado(this.partido._id, asd.resultado).subscribe(res => {
          this.swipe.emit(true);
        });
      }
    });
  }
}

@Component({
  selector: 'app-dialog-invitar-jugador-equipo',
  template: `<h1 mat-dialog-title>Resultado final</h1>
  <mat-dialog-content>
    <app-card-resultado-partido (resultado)="submit($event)"
                                [editable]="true" [partido]="data.partido"
                                [predio]="data.predio">
    </app-card-resultado-partido>
  </mat-dialog-content>`
})
export class DialogResultadoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogResultadoComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  submit(resultado) {
    this.dialogRef.close({resultado: resultado});
  }


}
