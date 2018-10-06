import {Component, OnInit} from '@angular/core';
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
  constructor(private predioService: PredioService,
              private deporteService: DeporteService) {  }

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(res => {
      this.deportes = res;
    });
    this.predioService.getCanchas().subscribe(res => {
      if(res.length > 0)
        this.canchas = res;
      else
        this.canchas = [];
    });
  }

  nuevaCancha(){
    this.canchas.push(new Cancha(true));  // mandar con cancha base en true
  }

  agregarCanchas() {
    console.log(this.canchas);
  }



}
