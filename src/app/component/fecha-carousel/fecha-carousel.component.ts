import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Horario} from '../../models/horario';
import {Predio} from '../../models/predio';
import {PredioService} from '../../../services/predioService';
import * as moment from 'moment';

@Component({
  selector: 'app-fecha-carousel',
  templateUrl: './fecha-carousel.component.html',
  styleUrls: ['./fecha-carousel.component.css']
})
export class FechaCarouselComponent implements OnInit {

  dias: string[];
  horarios: Horario[];
  abre = false;
  defaultDate = new Date();
  predio: Predio;
  @Output() emitHorario: EventEmitter<Array<Horario>> = new EventEmitter<Array<Horario>>();

  constructor(private predioService: PredioService,
              private _formBuilder: FormBuilder) {
    this.horarios = [];
    this.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    for (let i = 0; i < this.dias.length; i++) {
      this.horarios.push({
        dia: this.dias[i], horario: [{desde: null, hasta: null}], abre: false
      });
    }
  }

  ngOnInit() {
    const today = new Date();
    this.defaultDate.setHours(this.redondearHora(today.getHours(), today.getMinutes())[0]);
    this.defaultDate.setMinutes(this.redondearHora(today.getHours(), today.getMinutes())[1]);
    this.predioService.getPredio(localStorage.getItem('id')).subscribe(predio => {
      this.predio = predio;
      for (let i = 0; i < predio.horario.length; i++) {
        for (let k = 0; k < this.horarios.length; k++) {
          if (this.horarios[k].dia === predio.horario[i].dia) {
            this.horarios[k].abre = true;
            for (let j = 0; j < predio.horario[i].horario.length; j++) {
              this.horarios[k].horario[j].desde = moment.utc(predio.horario[i].horario[j].desde).format('HH:mm');
              this.horarios[k].horario[j].hasta = moment.utc(predio.horario[i].horario[j].hasta).format('HH:mm');
            }
          }
        }
      }
      this.sendHorarios();
    });
  }

  private redondearHora(hours, minutes) {
    let m = (((minutes + 15) / 30 | 0) * 30) % 60;
    // let m = (((minutes + 15) / 30 | 0) * 30) % 60;
    // let h = ((((minutes/105) + .5) | 0) + hours) % 24;
    let h = ((((minutes / 105) + .5) | 0) + hours) % 24;
    return [h, m];
  }

  sendHorarios() {
    let asd = [];
    for (let i of this.horarios) {
      if (i.abre) {
        for (let j of i.horario) {
          if (j.desde instanceof Date)
            j.desde = moment.utc().hours(j.desde.getHours()).minutes(j.desde.getMinutes());
          else
            j.desde = moment.utc().hours(j.desde.toString().split(':')[0]).minutes(j.desde.toString().split(':')[1]).toDate();
          if (j.hasta instanceof Date)
            j.hasta = moment.utc().hours(j.hasta.getHours()).minutes(j.hasta.getMinutes());
          else
            j.hasta = moment.utc().hours(j.hasta.toString().split(':')[0]).minutes(j.hasta.toString().split(':')[1]).toDate();
        }
        asd.push(i);
      }
    }
    this.emitHorario.emit(asd);
  }

  agregarHorario(i) {
    this.horarios[i].horario.push({
      desde: null,
      hasta: null
    });
  }
}
