import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-calificacion',
  templateUrl: './card-calificacion.component.html',
  styleUrls: ['./card-calificacion.component.css']
})
export class CardCalificacionComponent implements OnInit {

  @Input() destinatario: {
    jop: string,
    i: number
  };
  @Output() siguienteStep: EventEmitter<number> = new EventEmitter<number>();
  puntuacion: {
    personalidad: number,
    tecnica: number,
    puntualidad: number
  };
  puntuacionPredio: {
    precio: number,
    estado: number,
    atencion: number
  };
  step = 1;
  @Input() i: number;
  constructor() { }

  ngOnInit() {
    console.log(this.i);
    this.puntuacion = {
      personalidad: null,
      tecnica: null,
      puntualidad: null
    };
    this.puntuacionPredio = {
      precio: null,
      estado: null,
      atencion: null
    };
  }

  setPuntaje() {
    console.log(this.puntuacion);
    this.siguienteStep.emit(this.i++);
  }
}
