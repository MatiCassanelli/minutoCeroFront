import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import {debug} from 'util';
import {Jugador} from '../../models/jugador';

interface Horario {
  dia: String;
  horario: [{
    desde: Date,
    hasta: Date
  }];
}

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
  @Output() notifyParent: EventEmitter<Array<Jugador>> = new EventEmitter<Array<Jugador>>();


  constructor() {
    this.horarios = [];
    this.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    for (let i = 0; i < this.dias.length; i++) {
      this.horarios.push({
        'dia': this.dias[i], 'horario': [{'desde': null, 'hasta': null}, {'desde': null, 'hasta': null}]
      });
    }
    // this.horario = { 'dia': 'Lunes', 'desde': null, 'hasta': null};
  }

  ngOnInit() {
  }

  // addHorario(value) {
  //   this.horarios.push(value);
  // }
  // removeHorario(value) {
  //   this.horarios.splice(this.horarios.indexOf(value.dia), 1);
  // }

  sendHorarios() {
    // this.jugadoresInvitados.emit(this.horarios);
    // this.notifyParent.emit(this.horarios);
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
