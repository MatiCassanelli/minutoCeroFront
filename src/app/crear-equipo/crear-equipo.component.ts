import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {Equipo} from '../models/equipo';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css']
})
export class CrearEquipoComponent implements OnInit {

  form: FormGroup;
  deportes: SelectItem[];
  equipo = new Equipo();

  constructor(private fb: FormBuilder) {
    this.deportes = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'}
      ];
  }

  ngOnInit() {
    this.form = this.fb.group ({
      nombreEquipo: '',
      deporte: '',
      jugador: ''
    });
  }

  onSubmit() {
    this.equipo.nombre = this.form.get('nombreEquipo').value;
    this.equipo.deporte = this.form.get('deporte').value;
    console.log(this.equipo);
  }

  // nuevoEquipo() {
  //   this.model = new Equipo(42, '', '', '');
  // }
  // deportes = ['Futbol 5', 'Futbol 7', 'Futbol 11'];
  //
  // model = new Equipo(18, '', this.deportes[0], '');
  //
  // submitted = false;
  //
  // onSubmit() { this.submitted = true; }

}
