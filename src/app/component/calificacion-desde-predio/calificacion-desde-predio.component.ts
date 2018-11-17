import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Jugador} from '../../models/jugador';
import {CalificacionService} from '../../../services/calificacionService';

@Component({
  selector: 'app-calificacion-desde-predio',
  templateUrl: './calificacion-desde-predio.component.html',
  styleUrls: ['./calificacion-desde-predio.component.css']
})
export class CalificacionDesdePredioComponent implements OnInit {

  @Input() jugador: Jugador;
  asistio = false;
  @Output() sendCalificacion: EventEmitter<any> = new EventEmitter<any>();
  dataSource: Object;
  constructor() {
  }

  ngOnInit() {
  }

  setPuntaje() {
    this.sendCalificacion.emit({puntuacion: this.asistio, jugador: this.jugador});
  }

}

// this.dataSource = {
//   'chart': {
//     'lowerLimit': '0',
//     'upperLimit': '100',
//     'showValue': '1',
//     'numberSuffix': '%',
//     'theme': 'fusion',
//     'showToolTip': '0'
//   },
//   // Gauge Data
//   'colorRange': {
//     'color': [{
//       'minValue': '0',
//       'maxValue': '33',
//       'code': '#F2726F'
//     }, {
//       'minValue': '33',
//       'maxValue': '67',
//       'code': '#FFC533'
//     }, {
//       'minValue': '67',
//       'maxValue': '100',
//       'code': '#62B58F'
//     }]
//   },
//   'pointers': {
//     'pointer': [
//       {
//         'value': this.jugador.calificacionPredio.porcentajeCalificacionesPositivas
//       }
//     ]
//   },
// };
