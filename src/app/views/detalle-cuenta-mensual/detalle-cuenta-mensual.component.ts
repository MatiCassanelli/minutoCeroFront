import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle-cuenta-mensual',
  templateUrl: './detalle-cuenta-mensual.component.html',
  styleUrls: ['./detalle-cuenta-mensual.component.css']
})
export class DetalleCuentaMensualComponent implements OnInit {

  mes: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.mes = param.mes;
    });
  }

}
