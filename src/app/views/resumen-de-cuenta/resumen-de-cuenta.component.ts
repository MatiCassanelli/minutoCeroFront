import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen-de-cuenta',
  templateUrl: './resumen-de-cuenta.component.html',
  styleUrls: ['./resumen-de-cuenta.component.css']
})
export class ResumenDeCuentaComponent implements OnInit {

  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  constructor() { }

  ngOnInit() {
  }

}
