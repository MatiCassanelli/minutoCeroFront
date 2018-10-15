import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Jugador} from '../../models/jugador';
import {Predio} from '../../models/predio';

@Component({
  selector: 'app-card-calificacion',
  templateUrl: './card-calificacion.component.html',
  styleUrls: ['./card-calificacion.component.css']
})
export class CardCalificacionComponent implements OnInit {

  @Input() jugador: Jugador;
  @Input() predio: Predio;
  @Output() sendCalificacion: EventEmitter<any> = new EventEmitter<any>();
  // puntuacion: {
  //   personalidad: number,
  //   tecnica: number,
  //   puntualidad: number
  // };
  // puntuacionPredio: {
  //   precio: number,
  //   estado: number,
  //   atencion: number
  // };
  puntuado = false;
  tags = [];
  puntaje1: number;
  puntaje2: number;
  puntaje3: number;
  click1 = true;
  click2 = true;
  click3 = true;
  notClick = true;

  constructor() {
  }

  ngOnInit() {
    if (this.jugador) {
      this.tags = [{value: 'personalidad', label: 'Personalidad'},
        {value: 'tecnica', label: 'Tecnica'},
        {value: 'puntualidad', label: 'Puntualidad'}];
    }
    if (this.predio) {
      this.tags = [{value: 'atencion', label: 'Atencion'},
        {value: 'estadoCancha', label: 'Estado Canchas'},
        {value: 'precio', label: 'Precio'}];
    }
  }

  setPuntaje() {
    this.puntuado = true;
    let usuario: any;
    let puntuacion: any;
    if (this.jugador) {
      usuario = this.jugador;
      puntuacion = {
        personalidad: this.puntaje1,
        tecnica: this.puntaje2,
        puntualidad: this.puntaje3
      };
    }
    if (this.predio) {
      usuario = this.predio;
      puntuacion = {
        atencion: this.puntaje1,
        estadoCanchas: this.puntaje2,
        precio: this.puntaje3
      };
    }
    if (this.puntaje1 && this.puntaje2 && this.puntaje3) {
      debugger;
      this.sendCalificacion.emit({puntuacion: puntuacion, jugador: usuario});
    }
  }
}
