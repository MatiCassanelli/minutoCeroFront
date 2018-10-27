import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Horario} from '../../models/horario';

@Component({
  selector: 'app-fecha-carousel',
  templateUrl: './fecha-carousel.component.html',
  styleUrls: ['./fecha-carousel.component.css']
})
export class FechaCarouselComponent implements OnInit {

  // horariosForm: FormGroup;
  // // horarios: FormArray;

  dias: string[];
  horarios: Horario[];
  abre = false;
  defaultDate = new Date();
  @Output() emitHorario: EventEmitter<Array<Horario>> = new EventEmitter<Array<Horario>>();

  constructor(private atp: AmazingTimePickerService,
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
    // const start = new Date();
    // this.remainder = 60 - (start.getMinutes() % 60);
    const today = new Date();
    this.defaultDate.setHours(this.redondearHora(today.getHours(), today.getMinutes())[0]);
    this.defaultDate.setMinutes(this.redondearHora(today.getHours(), today.getMinutes())[1]);
  }

  private redondearHora(hours, minutes) {
    let m = (((minutes + 15) / 30 | 0) * 30) % 60;
    // let m = (((minutes + 15) / 30 | 0) * 30) % 60;
    // let h = ((((minutes/105) + .5) | 0) + hours) % 24;
    let h = ((((minutes / 105) + .5) | 0) + hours) % 24;
    return [h, m];
  }


  // addHorario(value) {
  //   this.horarios.push(value);
  // }
  // removeHorario(value) {
  //   this.horarios.splice(this.horarios.indexOf(value.dia), 1);
  // }

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

// this.dias = [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
// public config: SwiperConfigInterface = {
//   a11y: true,
//   direction: 'horizontal',
//   slidesPerView: 1,
//   keyboard: true,
//   mousewheel: true,
//   scrollbar: false,
//   navigation: false,
//   pagination: true
// };
//
// private scrollbar: SwiperScrollbarInterface = {
//   el: '.swiper-scrollbar',
//   hide: false,
//   draggable: true
// };
//
// private pagination: SwiperPaginationInterface = {
//   el: '.swiper-pagination',
//   clickable: true,
//   hideOnClick: false
// };
