import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {Predio} from '../../models/predio';
import {Horario} from '../../models/horario';
import {Cancha} from '../../models/cancha';
import {PredioService} from '../../../services/predioService';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-registro-predio-steps',
  templateUrl: './registro-predio-steps.component.html',
  styleUrls: ['./registro-predio-steps.component.css']
})
export class RegistroPredioStepsComponent implements OnInit, AfterViewInit {

  predio: Predio;
  isLinear = true;
  step = 1;
  nombrePredio: string;
  telefono: string;
  horarios: Horario[];
  canchas: Cancha[];
  ubicacion = {
    lat: String,
    lng: String
  };
  configHoras: {
    dia: {
      desde: Date,
      hasta: Date
    },
    noche: {
      desde: Date,
      hasta: Date
    }
  };

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private _formBuilder: FormBuilder,
              private predioService: PredioService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['step']) {
        this.step = params['step'];
      }
    });
  }

  ngAfterViewInit() {
    for (let i = 1; i < this.step; i++) {
      this.stepper.next();
    }
  }

  siguiente(event, stepper: MatStepper) {
    // console.log(event);
    if (event.infoContacto) {
      this.horarios = event.infoContacto.horarios;
      this.nombrePredio = event.infoContacto.nombre;
      this.telefono = event.infoContacto.telefono;
      this.predioService.createPredio({nombre: this.nombrePredio, telefono: this.telefono, step: 1}).subscribe((res) => {
        this.predioService.setHorarios(this.horarios, 1).subscribe((asd) => {
          this._actualizarStep(1);
        });
      });
    }

    if (event.configHoras) {
      this.configHoras = event.configHoras;
      this.predioService.setConfiguracionHorarios(this.configHoras, 2).subscribe(() => {
        this._actualizarStep(2);
      });
    }

    if (event.canchas) {
      this.canchas = event.canchas;
      this.predioService.setCanchas(this.canchas, 3).subscribe(() => {
        this._actualizarStep(3);
      });
    }

    if (event.ubicacion) {
      this.ubicacion = event.ubicacion;
      this.predioService.setUbicacion(this.ubicacion, 4);
      this._actualizarStep(4);
    }

    if (event)
      stepper.next();
  }

  crearPredio() {
    this.predioService.updateStep(5).subscribe((res) => {
      this._actualizarStep(5);
      this.router.navigateByUrl('/predio');
    });

  }

  private _actualizarStep(step) {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario.stepRegistro = step;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

}
