import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Predio} from '../../models/predio';
import {PredioService} from '../../../services/predioService';
import {Router} from '@angular/router';
import {Horario} from '../../models/horario';


@Component({
  selector: 'app-registrar-predio1',
  templateUrl: './registrar-predio1.component.html',
  styleUrls: ['./registrar-predio1.component.css'],
  providers: [PredioService]
})
export class RegistrarPredio1Component implements OnInit {

  nombreHoraForm: FormGroup;
  horarios: Horario[];
  disabled = true;
  @Output() stepEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.nombreHoraForm = this._formBuilder.group({
      nombrePredio: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  getHorarios(event) {
    this.horarios = event;

    this.stepEmit.emit({infoContacto: {
        nombre: this.nombreHoraForm.get('nombrePredio').value,
        telefono: this.nombreHoraForm.get('telefono').value,
        horarios: this.horarios
      }
    });
  }
}
