import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-resultado-partido',
  templateUrl: './card-resultado-partido.component.html',
  styleUrls: ['./card-resultado-partido.component.css']
})
export class CardResultadoPartidoComponent implements OnInit {

  golesLocal: number = 3;
  golesVisitante: number = 2;
  @Input() editable: boolean;
  constructor() { }

  ngOnInit() {
  }

}
