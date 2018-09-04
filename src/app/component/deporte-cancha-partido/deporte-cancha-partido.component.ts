import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeporteService} from '../../../services/deporteService';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-deporte-cancha-partido',
  templateUrl: './deporte-cancha-partido.component.html',
  styleUrls: ['./deporte-cancha-partido.component.css']
})
export class DeporteCanchaPartidoComponent implements OnInit {

  // @Output() canchaSeleccionada: any;
  @Output() canchaSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  @Output() fechaSeleccionada: EventEmitter<Date> = new EventEmitter<Date>();
  fechaPartido: Date;
  tiposCancha: SelectItem[];
  invalidDates:  Array<Date>;
  defaultDate = new Date();

  constructor(private deporteService: DeporteService) { }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      this.tiposCancha = [];
      for (let cancha of res){
        this.tiposCancha.push({
          label: cancha.nombre,
          value: cancha._id
        });
      }
    });
    let today = new Date();
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [invalidDate];
    this.defaultDate.setHours(this.redondearHora(today.getHours(), today.getMinutes())[0]);
    this.defaultDate.setMinutes(this.redondearHora(today.getHours(), today.getMinutes())[1]);
  }
  sendCancha(event) {
    this.canchaSeleccionada.emit(event.value);
  }

  private redondearHora(hours, minutes) {
    // let m = (((minutes + 7.5)/15 | 0) * 15) % 60;
    let m = (((minutes + 15)/30 | 0) * 30) % 60;
    // let m = (((minutes + 15)/30) * 30) % 60;
    // let h = ((((minutes/105) + .5) | 0) + hours) % 24;
    let h = ((((minutes/105) + .5) | 0) + hours) % 24;
    return [h, m];
  }

  definirFecha(event) {
    this.fechaPartido = event;
    this.fechaSeleccionada.emit(this.fechaPartido);
  }
}
