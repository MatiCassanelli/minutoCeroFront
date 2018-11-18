import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ResumenService} from '../../../services/resumenService';
import {ResumenCuenta} from '../../models/resumenCuenta';


@Component({
  selector: 'app-detalle-cuenta-mensual',
  templateUrl: './detalle-cuenta-mensual.component.html',
  styleUrls: ['./detalle-cuenta-mensual.component.css']
})
export class DetalleCuentaMensualComponent implements OnInit {

  displayedColumns = ['Cancha', 'Fecha', 'PrecioCancha', 'Comisión'];
  dataSource = new MatTableDataSource<any>();
  resumen: ResumenCuenta;

  constructor(private route: ActivatedRoute,
              private resumenService: ResumenService) {
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.resumenService.getResumenById(param.id).subscribe(res => {
        this.resumen = res;
        console.log(this.resumen);
        const data = this.resumen.detalle.lineasDeFacturacion.slice();
        const totalAlquilerCanchas = data.reduce((accum, curr) => accum + curr.precio, 0);
        const totalComision = data.reduce((accum, curr) => accum + curr.comision, 0);
        data.push({
          isTotalsRow: true,
          fechaReserva: null,
          cancha: {
            id: '',
            nombreCancha: 'Total del mes'
          },
          precio: totalAlquilerCanchas,
          comision: totalComision
        });
        data.push({
          isTotalsRow: true,
          fechaReserva: null,
          cancha: {
            id: '',
            nombreCancha: 'Subtotal'},
          precio: null,
          comision: this.resumen.detalle.subtotal
        });
        if (this.resumen.detalle.recargo && this.resumen.detalle.recargo > 0) {
          data.push({
            isTotalsRow: true,
            fechaReserva: null,
            cancha: {
              id: '',
              nombreCancha: 'Recargo'},
            precio: null,
            comision: this.resumen.detalle.recargo
          });
        }
        data.push({
          isTotalsRow: true,
          fechaReserva: null,
          cancha: {
            id: '',
            nombreCancha: 'Total a abonar'},
          precio: null,
          comision: this.resumen.detalle.total
        });

        this.dataSource.data = data;
      });
    });
  }

  isTotalsRow = (_, rowData) => rowData.isTotalsRow;
  // isTotalsRow = (data, index) => index === this.dataSource.data.length;
}

