import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Predio} from '../models/predio';

@Component({
  selector: 'app-registrar-predio1',
  templateUrl: './registrar-predio1.component.html',
  styleUrls: ['./registrar-predio1.component.css']
})
export class RegistrarPredio1Component implements OnInit {

  dias: string[];
  predio: Predio;
  form: FormGroup;
  horarios: Array<any>;

  constructor(private fb: FormBuilder) {
    this.horarios = new Array();
    // this.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    // this.dias = ['Lunes', 'Martes', 'Miercoles'];
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombrePredio: null,
      telefono: null
    });
  }
  agregarHorarios(event) {
    this.horarios = event;
  }

  onSubmit() {
    this.predio = new Predio();
  }

}
