import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PredioService} from '../../../services/predioService';
import {Cancha} from '../../models/cancha';
import {Deporte} from '../../models/deporte';
import {DeporteService} from '../../../services/deporteService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carga-nueva-cancha',
  templateUrl: './carga-nueva-cancha.component.html',
  styleUrls: ['./carga-nueva-cancha.component.css']
})
export class CargaNuevaCanchaComponent implements OnInit {

  canchas: Cancha[];
  deportes: Deporte[];
  @Input() steps = false;
  @Output() canchasSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  constructor(private predioService: PredioService,
              private deporteService: DeporteService,
              private router: Router) {  }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      this.deportes = res;
    });
    this.predioService.getCanchas().subscribe(res => {
      if(res.length > 0){
        this.canchas = res;
        this.canchasSeleccionada.emit({canchas: this.canchas});
      } else
        this.canchas = [];
    });
  }

  nuevaCancha(){
    this.canchas.push(new Cancha(localStorage.getItem('id'), true));
  }

  agregarCanchas() {
    if (this.steps) {
      this.canchasSeleccionada.emit({canchas: this.canchas});
    } else {
      this.predioService.setCanchas(this.canchas).subscribe(res => {
        this.router.navigateByUrl('/predio');
      });
    }
  }
  eliminarCancha(cancha) {
    this.canchas.splice(this.canchas.indexOf(cancha), 1);
  }


}
