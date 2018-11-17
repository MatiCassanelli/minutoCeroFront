import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-resumen-mensual',
  templateUrl: './card-resumen-mensual.component.html',
  styleUrls: ['./card-resumen-mensual.component.css']
})
export class CardResumenMensualComponent implements OnInit {

  @Input() mes: string;
  constructor() { }

  ngOnInit() {
  }

}
