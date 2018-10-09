import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {EquipoService} from '../../../services/equipoService';
import {Equipo} from '../../models/equipo';
import {JugadorService} from '../../../services/jugadorService';
import {Jugador} from '../../models/jugador';
import { Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DeporteService} from '../../../services/deporteService';
import {Deporte} from '../../models/deporte';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css'],
  providers: [JugadorService, EquipoService, ConfirmationService, DeporteService]
})
export class CrearEquipoComponent implements OnInit {

  jugadoresInvitados: boolean;
  form: FormGroup;
  deportes: SelectItem[];
  jugadores: Array<Jugador>;
  nombreJugadores: string[];
  equipo = new Equipo();


  constructor(private fb: FormBuilder,
              private router: Router,
              private jugadorService: JugadorService,
              private equipoService: EquipoService,
              private deporteService: DeporteService) {
    this.jugadores = [];
    this.nombreJugadores = [];
    this.jugadoresInvitados = false;
  }

  ngOnInit() {
    this.form = this.fb.group ({
      nombreEquipo: null,
      deporte: null,
      jugador: null
    });
    this.deporteService.getDeportes().subscribe(res => {
      this.deportes = [];
      for (let cancha of res) {
        this.deportes.push({
          label: cancha.nombre,
          value: cancha._id
        });
      }
    });
  }

  getJugadores(event) {
    this.jugadores = event;
    console.log('recibiendo', event);
    console.log('this.jugadores', this.jugadores);

  }

  onSubmit() {
    this.equipoService.createEquipo({
      nombre: this.form.get('nombreEquipo').value,
      deporte: this.form.get('deporte').value
      // capitan: '5b5e5648b7e1c6236f5c7339' // este es el _id del usuario q viene de la sesion
    }).toPromise().then(eq => {
      let jug = new Array();
      for (let a of this.jugadores) {
        if(a._id !== eq.capitan)
          jug.push(a.email);
      }
      this.equipoService.invitarJugadores({
        jugadores: jug
      }, eq._id).subscribe(resp => {
        this.equipo = resp;
        console.log(this.equipo);
        return this.router.navigateByUrl('/equipo/info/' + this.equipo._id);
      }, error1 => console.log(error1));
      }
    ).catch(err => {
      console.log(err);
      return err;
    });
  }

  setChecked(event){
    this.jugadoresInvitados = event;
  }


}
