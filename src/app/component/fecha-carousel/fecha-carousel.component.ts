import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Horario} from '../../models/horario';
import {Predio} from '../../models/predio';
import {PredioService} from '../../../services/predioService';

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
    // this.predioService.getPredio(localStorage.getItem('id')).subscribe(predio => {
    //   this.predio = predio;
    //   for (let i = 0; i < predio.horario.length; i++) {
    //     this.horarios[i].dia = predio.horario[i].dia;
    //     this.horarios[i].abre = true;
    //     this.horarios[i].horario = predio.horario[i].horario;
    //   }
    // });
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
    for (let a of this.horarios)
      asd.push(a);
    for (let i of asd) {
      if (i.abre) {
        for (let j of i.horario) {
          if (!j.desde || !j.hasta)
            i.horario.splice(i.horario.indexOf(j), 1);
        }
      } else {
        this.horarios.splice(this.horarios.indexOf(i), 1);
      }
    }
    this.emitHorario.emit(this.horarios);
  }

  agregarHorario(i) {
    this.horarios[i].horario.push({
      desde: null,
      hasta: null
    });
  }
}
