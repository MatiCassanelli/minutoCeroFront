import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PredioService} from '../../../services/predioService';

@Component({
  selector: 'app-configuracion-horas',
  templateUrl: './configuracion-horas.component.html',
  styleUrls: ['./configuracion-horas.component.css']
})
export class ConfiguracionHorasComponent implements OnInit {

  horarios: {
    dia: {
      desde: Date,
      hasta: Date
    },
    noche: {
      desde: Date,
      hasta: Date
    }
  };
  defaultDate = new Date();
  @Output() stepEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private predioService: PredioService) {
    this.horarios = {
      dia: {desde: null, hasta: null},
      noche: {desde: null, hasta: null}
    };
  }

  ngOnInit() {
    const today = new Date();
    this.defaultDate.setHours(this.redondearHora(today.getHours(), today.getMinutes())[0]);
    this.defaultDate.setMinutes(this.redondearHora(today.getHours(), today.getMinutes())[1]);
  }

  private redondearHora(hours, minutes) {
    let m = (((minutes + 15) / 30 | 0) * 30) % 60;
    let h = ((((minutes / 105) + .5) | 0) + hours) % 24;
    return [h, m];
  }

  sendHorarios() {
    this.stepEmit.emit({
      configHoras: this.horarios
    });
    // this.predioService.setConfiguracionHorarios(this.horarios).subscribe(res => {
    //   console.log(res);
    // });
  }
}
