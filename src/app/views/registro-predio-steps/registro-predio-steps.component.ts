import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {Predio} from '../../models/predio';
import {Horario} from '../../models/horario';
import {Cancha} from '../../models/cancha';
import {PredioService} from '../../../services/predioService';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-registro-predio-steps',
  templateUrl: './registro-predio-steps.component.html',
  styleUrls: ['./registro-predio-steps.component.css']
})
export class RegistroPredioStepsComponent implements OnInit {

  isLinear = true;
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

  // predio = JSON.parse(localStorage.getItem('usuario'));

  constructor(private _formBuilder: FormBuilder,
              private predioService: PredioService) {
  }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  siguiente(event, stepper: MatStepper) {
    // console.log(event);
    if (event.infoContacto) {
      this.horarios = event.infoContacto.horarios;
      this.nombrePredio = event.infoContacto.nombre;
      this.telefono = event.infoContacto.telefono;
    }
    if (event.canchas)
      this.canchas = event.canchas;
    if(event.configHoras)
      this.configHoras = event.configHoras;
    if (event.ubicacion)
      this.ubicacion = event.ubicacion;
    if (event)
      stepper.next();
  }

  crearPredio() {
    this.predioService.createPredio({
      nombre: this.nombrePredio,
      telefono: this.telefono,
      ubicacion: this.ubicacion,
      horarios: this.horarios
    }).subscribe(() => {
      forkJoin(this.predioService.setConfiguracionHorarios(this.configHoras),
      this.predioService.setCanchas(this.canchas)).subscribe(() => {
        const asd = this.predioService.setUbicacion(this.ubicacion);
        console.log(asd);
      });
    });

    // console.log('horarios', this.horarios);
    // console.log('canchas', this.canchas);
    // console.log('ubicacion', this.ubicacion);
  }

}
