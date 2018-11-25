import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {DeporteService} from '../../../services/deporteService';
import {Deporte} from '../../models/deporte';
import {Cancha} from '../../models/cancha';
import {FormControl, Validators} from '@angular/forms';
import {PredioService} from '../../../services/predioService';

@Component({
  selector: 'app-nueva-cancha',
  templateUrl: './nueva-cancha.component.html',
  styleUrls: ['./nueva-cancha.component.css']
})
export class NuevaCanchaComponent implements OnInit {

  deportes: Deporte[];
  imprime = true;
  deporte = new FormControl('', [Validators.required]);
  @Input() cancha: Cancha;
  @Input() deportePadre: string;
  @Input() sueloPadre: string;
  @Output() canchaEliminada: EventEmitter<Cancha> = new EventEmitter<Cancha>();
  @Input() precioNoche = false;
  tipoSuelo = ['Tierra', 'Sintético', 'Natural'];
  constructor(private deporteService: DeporteService,
              private predioService: PredioService) { }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
        if (this.deportePadre) {
          res = res.filter(d => d.cantJugadores < res.find(x => x._id === this.deportePadre).cantJugadores);
          if (res.length > 1) {
            this.deportes = res;
          } else {
            if (res.length === 1)
              this.deportes = res;
            this.imprime = false;
          }
        }
        else
          this.deportes = res;
    });
    if(!this.precioNoche) {
      this.predioService.getPredio(this.cancha.predio).subscribe(predio => {
        if(predio.configHorario)
          this.precioNoche = true;
      });
    }
  }

  nuevaSubCancha(cancha) {
    if(!cancha.canchasHijas)
      cancha.canchasHijas = [];
    if(!this.deportePadre)
      cancha.canchasHijas.push(new Cancha(localStorage.getItem('id'), false));
    else {
      const dep = this.deportes.find(x => x._id === this.cancha.deporte).cantJugadores;
      this.deporteService.getDeportes().subscribe(res => {
        if (res.find(x => x._id === this.deportePadre).cantJugadores > dep)
          cancha.canchasHijas.push(new Cancha(localStorage.getItem('id'), false));
      });

    }
  }
  minimoDeporte(event) {
    let cantidadJugadoresMinima = [];
    let deporteSeleccionado = this.deportes.find(x => x._id === event.value);
    for (let r of this.deportes) {
      cantidadJugadoresMinima.push(r.cantJugadores);
    }
    if (deporteSeleccionado.cantJugadores === Math.min.apply(null, cantidadJugadoresMinima))
      this.imprime = false;
  }

  emitEliminarCancha() {
    this.canchaEliminada.emit(this.cancha);
  }

  eliminarCancha(cancha) {
    this.cancha.canchasHijas.splice(this.cancha.canchasHijas.indexOf(cancha), 1);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
