import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {EquipoService} from '../../services/equipoService';
import {Equipo} from '../models/equipo';
import {JugadorService} from '../../services/jugadorService';
import {Jugador} from '../models/jugador';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css'],
  providers: [JugadorService, EquipoService]
})
export class CrearEquipoComponent implements OnInit {

  form: FormGroup;
  deportes: SelectItem[];
  jugadores: Array<Jugador>;
  nombreJugadores: string[];
  equipo = new Equipo();

  constructor(private fb: FormBuilder,
              private jugadorService: JugadorService,
              private equipoService: EquipoService) {
    this.deportes = [
      {label: 'Futbol 5', value: 'Futbol 5'},
      {label: 'Futbol 7', value: 'Futbol 7'},
      {label: 'Futbol 11', value: 'Futbol 11'}
      ];
    this.jugadores = new Array<Jugador>();
    this.nombreJugadores = new Array();
  }

  ngOnInit() {
    this.form = this.fb.group ({
      nombreEquipo: '',
      deporte: '',
      jugador: ''
    });
  }

  getJugadores(event): Array<Jugador> {
    this.jugadorService.getJugadores(event.query).subscribe((resp) => {
      console.log(resp);
      this.jugadores = resp;
    });
    return this.jugadores;
  }

  // getNombreJugadores(event) {
  //   this.jugadorService.getJugadores(event.query).subscribe((resp) => {
  //     for (let j of resp) {
  //       let s: string = j.nombre + ' ' + j.apellido;
  //       this.nombreJugadores.push(s);
  //     }
  //     if (this.nombreJugadores.length === resp.length) {
  //       console.log(this.nombreJugadores);
  //       return this.nombreJugadores;
  //     }
  //   });
  // }


  onSubmit() {
    this.equipoService.createEquipo({
      Nombre: this.form.get('nombreEquipo').value,
      Deporte: this.form.get('deporte').value,
      capitan: '5b2fe4488d58eae873cfedcd' // este es el id del usuario q viene de la sesion
      }).subscribe((res) => {
        this.equipo = res;
      console.log(this.equipo);
    }, error2 => console.log(error2));

    // this.equipoService.invitarJugadores({
    //   _id: this.equipo.id,
    //   email: this.form.get('jugador').value
    // }).subscribe(resp => {
    //   console.log(resp);
    // }, error1 => console.log(error1));
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
