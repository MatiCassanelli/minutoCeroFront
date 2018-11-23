import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReservaService} from '../../../services/reservaService';
import {PredioService} from '../../../services/predioService';
import {Cancha} from '../../models/cancha';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operator/switchMap';
import * as moment from 'moment';
import {Location} from '@angular/common';

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
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.reservaForm = fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
        if (params.fecha) {
          this.fecha = moment(params.fecha.split('Z')[0]).toDate();
          this.predioService.getMisCanchasDisponibles(this.fecha).subscribe(res => {
            this.canchas = res;
          });
        } else
          this.fecha = null;
      }
    );

  }

  getFecha(fecha) {
    this.fecha = fecha;
    this.predioService.getMisCanchasDisponibles(this.fecha).subscribe(res => {
      this.canchas = res;
    });
  }

  reservar() {
    this.reservaService.createReserva({
      jugadorNoRegistrado: {
        nombre: this.reservaForm.controls['nombre'].value,
        apellido: this.reservaForm.controls['apellido'].value,
        telefono: this.reservaForm.controls['telefono'].value
      },
      estado: 'Reservada',
      dia: this.fecha,
      cancha: this.cancha._id
    }).subscribe(res => {
      this.router.navigateByUrl('/predio');
    });
  }

  sendCancha(cancha) {
    this.cancha = cancha.value;
  }

  volver() {
    this.location.back();
  }

}
