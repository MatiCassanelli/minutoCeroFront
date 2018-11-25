import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PredioService} from '../../../services/predioService';
import * as moment from 'moment';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-configuracion-horas',
  templateUrl: './configuracion-horas.component.html',
  styleUrls: ['./configuracion-horas.component.css']
})
export class ConfiguracionHorasComponent implements OnInit {

  luces = false;
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
      if (res.configHorario) {
        this.horarios.dia.desde = moment.utc(res.configHorario.dia.desde).add('h', 3).toDate();
        this.horarios.dia.hasta = moment.utc(res.configHorario.dia.hasta).add('h', 3).toDate();
        if (this.horarios.noche.desde) {
          this.luces = true;
          this.horarios.noche.desde = moment.utc(res.configHorario.noche.desde).toDate();
          this.horarios.noche.hasta = moment.utc(res.configHorario.noche.hasta).toDate();
        }
        if (window.location.href.includes('registro'))
          this.sendHorarios();
      }
    });
  }

  private redondearHora(hours, minutes) {
    let m = (((minutes + 15) / 30 | 0) * 30) % 60;
    let h = ((((minutes / 105) + .5) | 0) + hours) % 24;
    return [h, m];
  }

  sendHorarios() {
    let horariosFinal = {
      dia: {
        desde: null,
        hasta: null,
      }
    };
    if (this.horarios.dia.desde instanceof Date)
      horariosFinal.dia.desde = moment.utc().hours(this.horarios.dia.desde.getHours()).minutes(this.horarios.dia.desde.getMinutes());
    else
      this.horarios.dia.desde = moment.utc().hours(this.horarios.dia.desde.toString().split(':')[0]).minutes(this.horarios.dia.desde.toString().split(':')[1]).toDate();
    if (this.horarios.dia.hasta instanceof Date)
      horariosFinal.dia.hasta = moment.utc().hours(this.horarios.dia.hasta.getHours()).minutes(this.horarios.dia.hasta.getMinutes());
    // console.log(this.horarios.dia.hasta)
    else
      this.horarios.dia.hasta = moment.utc().hours(this.horarios.dia.hasta.toString().split(':')[0]).minutes(this.horarios.dia.hasta.toString().split(':')[1]).toDate();
    if (this.luces) {
      horariosFinal['noche'] = {
        desde: null,
        hasta: null
      };
      if (this.horarios.noche.desde instanceof Date)
        horariosFinal['noche'].desde = moment.utc().hours(this.horarios.noche.desde.getHours()).minutes(this.horarios.noche.desde.getMinutes());
      else
        this.horarios.noche.desde = moment.utc().hours(this.horarios.noche.desde.toString().split(':')[0]).minutes(this.horarios.noche.desde.toString().split(':')[1]).toDate();
      if (this.horarios.noche.hasta instanceof Date)
        horariosFinal['noche'].hasta = moment.utc().hours(this.horarios.noche.hasta.getHours()).minutes(this.horarios.noche.hasta.getMinutes());
      else
        this.horarios.noche.hasta = moment.utc().hours(this.horarios.noche.hasta.toString().split(':')[0]).minutes(this.horarios.noche.hasta.toString().split(':')[1]).toDate();
    }

    this.stepEmit.emit({
      configHoras: horariosFinal
    });
    // this.predioService.setConfiguracionHorarios(this.horarios).subscribe(res => {
    //   console.log(res);
    // });
  }
}
