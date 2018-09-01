import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Jugador} from '../../models/jugador';
import {JugadorService} from '../../../services/jugadorService';
import {EquipoService} from '../../../services/equipoService';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-invitar-jugadores',
  templateUrl: './invitar-jugadores.component.html',
  styleUrls: ['./invitar-jugadores.component.css'],
  providers: [JugadorService]
})
export class InvitarJugadoresComponent implements OnInit {

  checked: boolean;
  form: FormGroup;
  jugadores: Jugador[];
  jugadoresSeleccionados: Jugador[];
  @Output() notifyParent: EventEmitter<Array<Jugador>> = new EventEmitter<Array<Jugador>>();
  @Output() jugadoresInvitados: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('invitar') myForm: NgForm;
  @Input() isReset;


  constructor(private fb: FormBuilder,
              private jugadorService: JugadorService) {
    this.jugadoresSeleccionados = new Array<Jugador>();
    this.checked = false;
  }

  ngOnInit() {
    this.form = this.fb.group ({
      jugador: null
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

  // sendJugadores() {
  //   this.jugadoresInvitados.emit(this.checked);
  //   this.notifyParent.emit(this.jugadoresSeleccionados);
  // }
  // agregarJug(value) {
  //   console.log('agregando', value);
  //   this.jugadoresSeleccionados.push(value);
  //   console.log('this.jugadoresSeleccionados', this.jugadoresSeleccionados);
  //   // this.checked = true;
  //   // this.notifyParent.emit(this.jugadoresSeleccionados);
  // }
  // eliminarJug(value) {
  //   console.log('eliminando', value);
  //   this.jugadoresSeleccionados.splice(this.jugadoresSeleccionados.indexOf(value), 1);
  //   console.log('this.jugadoresSeleccionados', this.jugadoresSeleccionados);
  //   // if(this.jugadoresSeleccionados.length === 0){
  //   //   this.checked = false;
  //   // }
  //   // this.notifyParent.emit(this.jugadoresSeleccionados);
  // }
  agregarJug(value) {
    this.jugadoresSeleccionados.push(value);
    this.notifyParent.emit(this.jugadoresSeleccionados);
  }
  eliminarJug(value) {
    this.jugadoresSeleccionados.splice(this.jugadoresSeleccionados.indexOf(value), 1);
    this.notifyParent.emit(this.jugadoresSeleccionados);
  }
  ngOnChanges() {
    this.isReset = true;
    if (this.isReset) {
      this.jugadoresSeleccionados = [];
      this.isReset = false;
      this.myForm.resetForm();
    }
  }
}
