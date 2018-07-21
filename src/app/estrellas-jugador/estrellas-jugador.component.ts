import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-estrellas-jugador',
  templateUrl: './estrellas-jugador.component.html',
  styleUrls: ['./estrellas-jugador.component.css']
})
export class EstrellasJugadorComponent implements OnInit {

  @Input() nombre;
  @Input() apellido;
  @Input() email;

  constructor() { }

  ngOnInit() {
  }

}
