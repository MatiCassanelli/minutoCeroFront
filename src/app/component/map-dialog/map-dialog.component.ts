import {Component, OnInit, Inject, EventEmitter} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Predio} from '../../models/predio';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {

  ubicacion = {
    lng: String,
    lat: String
  };
  predio: Predio;
  disabled = true;

  constructor(private dialogRef: MatDialogRef<MapDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  onSaveClick(): void {
    this.dialogRef.close({predio: this.predio, ubicacion: this.ubicacion});
  }

  getUbicacion(event) {
    this.ubicacion.lat = event.lat();
    this.ubicacion.lng = event.lng();
  }

  getPredio(event) {
    this.disabled = false;
    this.predio = event;
  }

}
