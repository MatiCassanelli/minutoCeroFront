import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PredioService} from '../../../services/predioService';
import {Cancha} from '../../models/cancha';
import {Deporte} from '../../models/deporte';
import {DeporteService} from '../../../services/deporteService';

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
              private deporteService: DeporteService) {  }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      this.deportes = res;
    });
    this.predioService.getCanchas().subscribe(res => {
      if(res.length > 0){
        this.canchas = res;
      }

      else
        this.canchas = [];
    });
  }

  nuevaCancha(){
    this.canchas.push(new Cancha(localStorage.getItem('id'), true));
  }

  agregarCanchas() {
    console.log(this.canchas);
    if (this.steps) {
      this.canchasSeleccionada.emit({canchas: this.canchas});
    } else {
      console.log('no step');
      this.predioService.setCanchas(this.canchas).subscribe(res => {
        console.log(res);
      });
    }
  }



}
