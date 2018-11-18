import {Component, Input, OnInit} from '@angular/core';
import {ResumenCuenta} from '../../models/resumenCuenta';
import * as moment from 'moment';

@Component({
  selector: 'app-card-resumen-mensual',
  templateUrl: './card-resumen-mensual.component.html',
  styleUrls: ['./card-resumen-mensual.component.css']
})
export class CardResumenMensualComponent implements OnInit {

  @Input() resumen: ResumenCuenta;
  mesFacturacion: string;
  constructor() { }

  ngOnInit() {
    this.mesFacturacion = moment(this.resumen.periodoDesde).locale('es').format('MMMM');
    this.mesFacturacion = this.mesFacturacion.replace(this.mesFacturacion[0], this.mesFacturacion[0].toUpperCase());
  }

}
