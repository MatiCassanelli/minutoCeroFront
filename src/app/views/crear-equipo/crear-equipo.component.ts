import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {EquipoService} from '../../../services/equipoService';
import {Equipo} from '../../models/equipo';
import {JugadorService} from '../../../services/jugadorService';
import {Jugador} from '../../models/jugador';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DeporteService} from '../../../services/deporteService';
import {Deporte} from '../../models/deporte';
import {ObservableService} from '../../observable.service';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css'],
  providers: [JugadorService, EquipoService, ConfirmationService, DeporteService]
})
export class CrearEquipoComponent implements OnInit {

  jugadoresInvitados: boolean;
  nombreEquipo: string;
  deporte: Deporte;
  form: FormGroup;
  deportes: Deporte[];
  jugadores: Array<Jugador>;
  nombreJugadores: string[];
  equipo = new Equipo();
  // disabled = (this.nombreEquipo && this.deporte);

  constructor(private fb: FormBuilder,
              private router: Router,
              private jugadorService: JugadorService,
              private equipoService: EquipoService,
              private deporteService: DeporteService,
              private observableService: ObservableService) {
    this.jugadores = [];
    this.nombreJugadores = [];
    this.jugadoresInvitados = false;
  }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      this.deportes = res;
    });
  }

  getJugadores(event) {
    this.jugadores = event;

  }

  onSubmit() {
    this.equipoService.createEquipo({ // creo el equipo. cuando vuelve, invito a los jugadores
      Nombre: this.nombreEquipo,
      Deporte: this.deporte
    }).toPromise().then(eq => {
        let jug = [];
        for (let a of this.jugadores) {
          if (a._id !== eq.capitan)
            jug.push(a._id);
        }
        this.equipoService.invitarJugadores({jugadores: jug}, eq._id).subscribe(() => {
          this.observableService.tieneEquipo(true);
          return this.router.navigateByUrl('/equipo/info/' + eq._id);
        });
      }
    ).catch(err => {
      return err;
    });
  }

  setChecked(event) {
    this.jugadoresInvitados = event;
  }


}
