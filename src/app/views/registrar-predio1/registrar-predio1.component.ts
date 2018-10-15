import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Predio} from '../../models/predio';
import {PredioService} from '../../../services/predioService';
import {Router} from '@angular/router';


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

  constructor(private fb: FormBuilder, private router: Router,
              private predioService: PredioService) {
    this.horarios = [];
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
      id: localStorage.getItem('id'), // es el id del predio q viene de la sesion
      nombre: this.form.get('nombrePredio').value,
      telefono: this.form.get('telefono').value,
      ubicacion: null,
      horario: this.horarios
    }).subscribe(resp => {
      this.predio = resp;
      console.log(this.predio);
      // this.router.navigateByUrl('/predio/registro/2');
    }, error1 => console.log(error1));
  }
}
