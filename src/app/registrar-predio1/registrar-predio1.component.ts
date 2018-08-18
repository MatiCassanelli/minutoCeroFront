import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Predio} from '../models/predio';
import {PredioService} from '../../services/predioService';


@Component({
  selector: 'app-registrar-predio1',
  templateUrl: './registrar-predio1.component.html',
  styleUrls: ['./registrar-predio1.component.css'],
  providers: [PredioService]
})
export class RegistrarPredio1Component implements OnInit {

  dias: string[];
  predio: Predio;
  form: FormGroup;
  horarios: Array<any>;

  constructor(private fb: FormBuilder,
              private predioService: PredioService) {
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
    this.predioService.createPredio({
      id: '5b5e5661b7e1c6236f5c733d',
      nombre: this.form.get('nombrePredio').value,
      telefono: this.form.get('telefono').value,
      ubicacion: null,
      horario: this.horarios
    }).subscribe(resp => {
      this.predio = resp;
      console.log(this.predio);
    }, error1 => console.log(error1));
  }
}
