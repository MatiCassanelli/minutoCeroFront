import { Component, OnInit } from '@angular/core';
import {ResumenService} from '../../../services/resumenService';

@Component({
  selector: 'app-resumen-de-cuenta',
  templateUrl: './resumen-de-cuenta.component.html',
  styleUrls: ['./resumen-de-cuenta.component.css']
})
export class ResumenDeCuentaComponent implements OnInit {

  resumenes = [];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  constructor(private resumenService: ResumenService) { }

  ngOnInit() {
    this.resumenService.getResumenes().subscribe(res => {
      this.resumenes = res;
    });
  }

}
