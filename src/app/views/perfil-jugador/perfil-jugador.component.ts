import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JugadorService} from '../../../services/jugadorService';
import {Jugador} from '../../models/jugador';
import {AmistadService} from '../../../services/amistadService';
import {DomSanitizer} from '@angular/platform-browser';
import {NotificacionService} from '../../../services/notificacionService';
import {ObservableService} from '../../observable.service';
import {Subscription} from 'rxjs/Subscription';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogResultadoComponent} from '../../component/card-notificacion-resultado-partido/card-notificacion-resultado-partido.component';
import {PredioService} from '../../../services/predioService';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.component.html',
  styleUrls: ['./perfil-jugador.component.css']
})
export class PerfilJugadorComponent implements OnInit {

  subscription: Subscription;
  jugador: Jugador;
  yaAmigos = false;
  solicitudEnviada = false;
  solicitudRecibida = false;
  solicitudId: string;
  dialogRef: MatDialogRef<DialogConfirmAmistadComponent>;

  constructor(private route: ActivatedRoute,
              private jugadorService: JugadorService,
              private amistadService: AmistadService,
              private notificacionService: NotificacionService,
              private observableService: ObservableService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.jugadorService.getJugadorById(params['id']).subscribe(res => {
          this.jugador = res[0];
        });
        this.amistadService.getAmigos().subscribe(amigos => {
          if (amigos && amigos.find(x => x._id === this.jugador._id)) {
            this.yaAmigos = true;
          } else {
            this.notificacionService.getSolicitudEnviada(params['id']).subscribe(rta => {
              if (rta.existe) {
                this.solicitudEnviada = true;
                this.solicitudId = rta.solicitud;
              } else {
                this.notificacionService.getSolicitudRecibida(params['id']).subscribe(rec => {
                  if (rec.existe) {
                    this.solicitudRecibida = true;
                    this.solicitudId = rec.solicitud;
                  }
                });
              }
            });
          }
        });
      }
    });
    // this.img = 'http://graph.facebook.com/' + this.jugador.idFacebook + '/picture?type=normal';
  }

  solicitudAmistad() {
    this.amistadService.enviarSolicitud(this.jugador._id).subscribe(res => {
      this.solicitudEnviada = true;
      this.solicitudId = res._id;
    });
  }

  cancelarSolicitud() {
    this.notificacionService.cancelarSolicitud(this.solicitudId).subscribe(() => {
      this.solicitudEnviada = false;
    });
  }

  eliminarAmistad() {
    alert('Deberia borrar la amistad');
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogConfirmAmistadComponent, {
      width: '600px',
      maxWidth: null
    });
    this.dialogRef.beforeClose().subscribe((asd) => {

      this.notificacionService.responder(this.solicitudId, 'amistad', asd.respuesta).subscribe(res => {
        if (asd.respuesta === 'Aceptado') {
          this.yaAmigos = true;
        } else {
          this.yaAmigos = false;
        }
        this.solicitudRecibida = false;
      });
    });
  }
}

@Component({
  selector: 'app-dialog-confirm-amistad',
  template: `<h1 mat-dialog-title>Aceptar amistad</h1>
  <mat-dialog-content>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button type="submit" (click)="submit('Aceptado')">Aceptar</button>
    <button mat-button type="submit" (click)="submit('Cancelado')">Cancelar</button>
  </mat-dialog-actions>`
})
export class DialogConfirmAmistadComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogConfirmAmistadComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  submit(respuesta) {
    this.dialogRef.close({respuesta: respuesta});
  }


}
