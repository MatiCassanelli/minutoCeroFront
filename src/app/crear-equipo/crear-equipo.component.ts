import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {EquipoService} from '../../services/equipoService';
import {Equipo} from '../models/equipo';
import {JugadorService} from '../../services/jugadorService';
import {Jugador} from '../models/jugador';
import { Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css'],
  providers: [JugadorService, EquipoService, ConfirmationService]
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
              private confirmationService: ConfirmationService) {
    this.deportes = [
      {label: 'Futbol 5', value: 'Futbol 5'},
      {label: 'Futbol 7', value: 'Futbol 7'},
      {label: 'Futbol 11', value: 'Futbol 11'}
      ];
    this.jugadores = new Array<Jugador>();
    this.nombreJugadores = new Array();
    this.jugadoresInvitados = false;
  }

  ngOnInit() {
    this.form = this.fb.group ({
      nombreEquipo: null,
      deporte: null,
      jugador: null
    });
  }

  getJugadores(event) {
    this.jugadores = event;
    console.log('recibiendo', event);
    console.log('this.jugadores', this.jugadores);

  }

  // // esto es para las sugerencias
  // getJugadores(event): Array<Jugador> {
  //   this.jugadorService.getJugadores(event.query).subscribe((resp) => {
  //     console.log(resp);
  //     this.jugadores = resp;
  //   });
  //   return this.jugadores;
  // }

  confirm() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de continuar sin invitar jugadores para que formen parte de tu equipo?',
      accept: () => {
        console.log(this.form.valid);
        if (this.form.valid) {
          console.log('entro');
          this.onSubmit();
        }
      }
    });
  }

  onSubmit() {
    this.equipoService.createEquipo({
      Nombre: this.form.get('nombreEquipo').value,
      Deporte: this.form.get('deporte').value,
      capitan: '5b2fe4708d58eae873cfede9' // este es el _id del usuario q viene de la sesion
    }).toPromise().then(eq => {
      let jug = new Array();
      for (let a of this.jugadores) {
        jug.push(a.email);
      }
      this.equipoService.invitarJugadores({
        _id: eq._id,
        email: jug
      }).subscribe(resp => {
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
