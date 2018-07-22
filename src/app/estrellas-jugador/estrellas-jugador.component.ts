import {Component, Input, OnInit} from '@angular/core';
import {Jugador} from '../models/jugador';

@Component({
  selector: 'app-estrellas-jugador',
  templateUrl: './estrellas-jugador.component.html',
  styleUrls: ['./estrellas-jugador.component.css']
})
export class EstrellasJugadorComponent implements OnInit {

  @Input() nombre;
  @Input() apellido;
  @Input() email;
  @Input() jugador: Jugador;

  constructor() { }

  ngOnInit() {
  }

}
