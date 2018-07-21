import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Jugador} from '../models/jugador';
import {JugadorService} from '../../services/jugadorService';
import {EquipoService} from '../../services/equipoService';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-invitar-jugadores',
  templateUrl: './invitar-jugadores.component.html',
  styleUrls: ['./invitar-jugadores.component.css']
})
export class InvitarJugadoresComponent implements OnInit {

  form: FormGroup;
  jugadores: Jugador[];
  jugadoresSeleccionados: Jugador[];
  @Output() notifyParent: EventEmitter<Array<Jugador>> = new EventEmitter<Array<Jugador>>();

  sendJugadores() {
    this.notifyParent.emit(this.jugadoresSeleccionados);
  }
  constructor(private fb: FormBuilder,
              private jugadorService: JugadorService) {
    this.jugadoresSeleccionados = new Array<Jugador>();
  }

  ngOnInit() {
    this.form = this.fb.group ({
      jugador: ''
    });
  }

  // esto es para las sugerencias
  getJugadores(event): Array<Jugador> {
    this.jugadorService.getJugadores(event.query).subscribe((resp) => {
      console.log(resp);
      this.jugadores = resp;
    });
    return this.jugadores;
  }

  agregarJug(value) {
    console.log('agregando', value);
    this.jugadoresSeleccionados.push(value);
    console.log('this.jugadoresSeleccionados',this.jugadoresSeleccionados);
  }
  eliminarJug(value) {
    console.log('eliminando', value);
    this.jugadoresSeleccionados.splice(this.jugadoresSeleccionados.indexOf(value), 1);
    console.log('this.jugadoresSeleccionados',this.jugadoresSeleccionados);
  }
}
