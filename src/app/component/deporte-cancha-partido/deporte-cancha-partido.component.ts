import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeporteService} from '../../../services/deporteService';
import {SelectItem} from 'primeng/api';
import * as moment from 'moment';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {FormControl, Validators} from '@angular/forms';
import {Deporte} from '../../models/deporte';



@Component({
  selector: 'app-deporte-cancha-partido',
  templateUrl: './deporte-cancha-partido.component.html',
  styleUrls: ['./deporte-cancha-partido.component.css'],
  providers: [AmazingTimePickerService]
})
export class DeporteCanchaPartidoComponent implements OnInit {

  // @Output() canchaSeleccionada: any;
  @Output() canchaSeleccionada: EventEmitter<Deporte> = new EventEmitter<Deporte>();
  @Output() fechaSeleccionada: EventEmitter<Date> = new EventEmitter<Date>();
  fechaPartido: Date;
  horaPartido: Date;
  // deportes: SelectItem[];
  deportes: Deporte[];
  invalidDates:  Array<Date>;
  defaultDate = new Date();
  public selectedTime: string;
  canchaControl = new FormControl('', [Validators.required]);

  constructor(private deporteService: DeporteService,
              private atp: AmazingTimePickerService) { }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      this.deportes = res;
      // for (let cancha of res){
      //   this.deportes.push({
      //     label: cancha.nombre,
      //     value: cancha._id
      //   });
      // }
    });
    let today = new Date();
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [invalidDate];
    this.defaultDate.setHours(this.redondearHora(today.getHours(), today.getMinutes())[0]);
    this.defaultDate.setMinutes(this.redondearHora(today.getHours(), today.getMinutes())[1]);
  }
  sendCancha(event) {
    this.canchaSeleccionada.emit(event.value._id);
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

  open() {
    const now = moment();
    // var now = moment(date.getDate().toString() + ' ' + date.getTime());
    now.add(30, 'minutes').startOf('hour');
    const h = now.toDate().getHours().toString();
    let m = now.toDate().getMinutes();
    if (m < 10)
      m*=10;
    let m1 = m.toString();
    const amazingTimePicker = this.atp.open({time: h + ':' + m1});
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }

  getDateTime(event) {
    this.fechaSeleccionada.emit(event);
  }
}
