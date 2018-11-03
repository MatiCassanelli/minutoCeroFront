import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReservaService} from '../../../services/reservaService';
import {PredioService} from '../../../services/predioService';
import {Cancha} from '../../models/cancha';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operator/switchMap';
import * as moment from 'moment';

@Component({
  selector: 'app-reserva-predio',
  templateUrl: './reserva-predio.component.html',
  styleUrls: ['./reserva-predio.component.css']
})
export class ReservaPredioComponent implements OnInit {

  reservaForm: FormGroup;
  nombreJugador: string;
  apellidoJugador: string;
  telefono: string;
  fecha: Date;
  canchas: Cancha[];
  cancha: Cancha;
  @Output() volverEmit = new EventEmitter<boolean>();

  constructor(private reservaService: ReservaService,
              private predioService: PredioService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
        if (params.fecha) {
          this.fecha = moment(params.fecha.split('Z')[0]).toDate();
        } else
          this.fecha = null;
      }
    );

    this.predioService.getCanchasWithPredio(localStorage.getItem('id')).subscribe(res => {
      this.canchas = res;
    });
  }

  getFecha(fecha) {
    debugger;
    this.fecha = fecha;
  }

  reservar() {
    this.reservaService.createReserva({
      jugadorNoRegistrado: {
        nombre: this.nombreJugador,
        apellido: this.apellidoJugador,
        telefono: this.telefono
      },
      estado: 'Reservada',
      dia: this.fecha,
      cancha: this.cancha._id
    }).subscribe(res => {
      this.router.navigateByUrl('/predio');
    });
  }

  sendCancha(cancha) {
    debugger;
    this.cancha = cancha.value;
  }

  volver() {
    this.volverEmit.emit(false);
  }

}
