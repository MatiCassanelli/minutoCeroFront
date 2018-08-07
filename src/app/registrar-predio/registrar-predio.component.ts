import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-registrar-predio',
  templateUrl: './registrar-predio.component.html',
  styleUrls: ['./registrar-predio.component.css']
})
export class RegistrarPredioComponent implements OnInit {

  dias: string[];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // this.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    this.dias = ['Lunes', 'Martes', 'Miercoles'];
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombrePredio: null,
      telefono: null,
      desde: null,
      hasta: null
    });
  }


  onSubmit() {
    console.log(this.form);
  }


}
