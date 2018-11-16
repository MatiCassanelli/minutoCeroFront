import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PredioService} from '../../../services/predioService';
import * as moment from 'moment';

@Component({
  selector: 'app-configuracion-horas',
  templateUrl: './configuracion-horas.component.html',
  styleUrls: ['./configuracion-horas.component.css']
})
export class ConfiguracionHorasComponent implements OnInit {

  horarios: {
    dia: {
      desde: any,
      hasta: any,
    },
    noche: {
      desde: any,
      hasta: any,
    }
  };
  defaultDate = new Date();
  @Output() stepEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private predioService: PredioService) {
    this.horarios = {
      dia: {desde: null, hasta: null},
      noche: {desde: null, hasta: null}
    };
  }

  ngOnInit() {
    const today = new Date();
    this.defaultDate.setHours(this.redondearHora(today.getHours(), today.getMinutes())[0]);
    this.defaultDate.setMinutes(this.redondearHora(today.getHours(), today.getMinutes())[1]);
    this.predioService.getPredio(localStorage.getItem('id')).subscribe(res => {
      this.horarios.dia.desde = moment(res.configHorario.dia.desde).format('HH:mm');
      this.horarios.dia.hasta = moment(res.configHorario.dia.hasta).format('HH:mm');
      this.horarios.noche.desde = moment(res.configHorario.noche.desde).format('HH:mm');
      this.horarios.noche.hasta = moment(res.configHorario.noche.hasta).format('HH:mm');
    });
  }

  private redondearHora(hours, minutes) {
    let m = (((minutes + 15) / 30 | 0) * 30) % 60;
    let h = ((((minutes / 105) + .5) | 0) + hours) % 24;
    return [h, m];
  }

  sendHorarios() {
    if (!(this.horarios.dia.desde instanceof Date))
      this.horarios.dia.desde = moment().hours(this.horarios.dia.desde.toString().split(':')[0]).minutes(this.horarios.dia.desde.toString().split(':')[1]).toDate();
    if (!(this.horarios.dia.hasta instanceof Date))
      this.horarios.dia.hasta = moment().hours(this.horarios.dia.hasta.toString().split(':')[0]).minutes(this.horarios.dia.hasta.toString().split(':')[1]).toDate();
    if (!(this.horarios.noche.desde instanceof Date))
      this.horarios.noche.desde = moment().hours(this.horarios.noche.desde.toString().split(':')[0]).minutes(this.horarios.noche.desde.toString().split(':')[1]).toDate();
    if (!(this.horarios.noche.hasta instanceof Date))
      this.horarios.noche.hasta = moment().hours(this.horarios.noche.hasta.toString().split(':')[0]).minutes(this.horarios.noche.hasta.toString().split(':')[1]).toDate();

    this.stepEmit.emit({
      configHoras: this.horarios
    });
    // this.predioService.setConfiguracionHorarios(this.horarios).subscribe(res => {
    //   console.log(res);
    // });
  }
}
