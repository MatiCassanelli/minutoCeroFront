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
  periodoDesde = moment();
  periodoHasta = moment();
  constructor() { }

  ngOnInit() {
    this.periodoDesde = moment.utc(this.resumen.periodoDesde);
    this.periodoHasta = moment.utc(this.resumen.periodoHasta);
    this.mesFacturacion = moment(this.resumen.periodoHasta).locale('es').format('MMMM');
    this.mesFacturacion = this.mesFacturacion.replace(this.mesFacturacion[0], this.mesFacturacion[0].toUpperCase());
  }

}
