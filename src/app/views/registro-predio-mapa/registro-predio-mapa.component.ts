import {Component, Inject, OnInit} from '@angular/core';
import {PredioService} from '../../../services/predioService';
import {ConfirmationService} from 'primeng/api';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogPlantelComponent} from '../../component/confirm-dialog-plantel/confirm-dialog-plantel.component';

@Component({
  selector: 'app-registro-predio-mapa',
  templateUrl: './registro-predio-mapa.component.html',
  styleUrls: ['./registro-predio-mapa.component.css'],
  providers: [PredioService, ConfirmationService]
})
export class RegistroPredioMapaComponent implements OnInit {

  direccion: string;
  ubicacion = {
    lat: String,
    lng: String
  };
  dialogRef: MatDialogRef<ConfirmUbicacionDialogComponent>;

  constructor(private predioService: PredioService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  getUbicacion(event) {
    this.ubicacion.lat = event.lat();
    this.ubicacion.lng = event.lng();
    // this.confirm1(this.ubicacion);
    this.openDialog(this.ubicacion);
  }

  confirm1(ubicacion) {
    this.confirmationService.confirm({
      message: 'Definir esta ubicación como dirección del predio?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('entrando...');
        this.setUbicacion(ubicacion);
        this.router.navigateByUrl('/predio');
      },
      reject: () => {
        alert('No aceptado');
      }
    });
  }

  setUbicacion(ubicacion) {
    this.predioService.setUbicacion(localStorage.getItem('id'), ubicacion).subscribe(res => {
      console.log(res);
    });
  }

  openDialog(ubicacion) {
    // this.fileNameDialogRef = this.dialog.open(MapComponent, {
    this.dialogRef = this.dialog.open(ConfirmUbicacionDialogComponent, {
      data: {
        ubicacion: ubicacion
      },
      width: '600px',
    });
    this.dialogRef.afterClosed().subscribe((ub) => {
      if (ub) {
        this.setUbicacion(ub);
        this.router.navigateByUrl('/predio');
      }
    });
  }
}

@Component({
  selector: 'app-confirm-ubicacion-dialog',
  template: `<h1 mat-dialog-title>Confirmar ubicacion</h1>
  <mat-dialog-actions>
    <button mat-button type="submit" (click)="submit(data.ubicacion)">Aceptar</button>
    <button mat-button type="button" mat-dialog-close>Cancelar</button>
  </mat-dialog-actions>`
})
export class ConfirmUbicacionDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogPlantelComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  submit(ub) {
    this.dialogRef.close(ub);
  }

}
