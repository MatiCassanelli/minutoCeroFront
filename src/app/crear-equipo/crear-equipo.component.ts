import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {Equipo} from '../models/equipo';
import {JugadorService} from '../../services/jugadorService';
import {Jugador} from '../models/jugador';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css'],
  providers: [JugadorService]
})
export class CrearEquipoComponent implements OnInit {

  form: FormGroup;
  deportes: SelectItem[];
  jugadores: Array<Jugador>;
  public nombreJugadores: Array<string>;
  equipo = new Equipo();

  constructor(private fb: FormBuilder, private jugadorService: JugadorService) {
    this.deportes = [
      {label: 'Futbol 5', value: 'Futbol 5'},
      {label: 'Futbol 7', value: 'Futbol 7'},
      {label: 'Futbol 11', value: 'Futbol 11'}
      ];
    this.jugadores = new Array<Jugador>();
  }

  ngOnInit() {
    this.form = this.fb.group ({
      nombreEquipo: '',
      deporte: '',
      jugador: ''
    });
  }

  getNombreJugadores(event) {
    this.nombreJugadores = new Array<string>();
    this.jugadorService.getJugadores(event.query).subscribe((resp) => {
        for (let i = 0; i < resp.length; i++) {
          this.nombreJugadores.push(resp[i].nombre);
        }
        console.log(this.nombreJugadores);
    });
    return this.nombreJugadores;
  }

  getJugadores(event): Array<Jugador> {
    this.jugadorService.getJugadores(event.query).subscribe((resp) => {
      this.jugadores = resp;
      });
    return this.jugadores;
  }

  onSubmit() {
    this.equipo.nombre = this.form.get('nombreEquipo').value;
    this.equipo.deporte = this.form.get('deporte').value;
    this.equipo.jugadores = this.form.get('jugador').value;
    console.log(this.equipo);
  }



  // nuevoEquipo() {
  //   this.model = new Equipo(42, '', '', '');
  // }
  // deportes = ['Futbol 5', 'Futbol 7', 'Futbol 11'];
  //
  // model = new Equipo(18, '', this.deportes[0], '');
  //
  // submitted = false;
  //
  // onSubmit() { this.submitted = true; }

}
