import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EquipoService} from '../../services/equipoService';
import {Equipo} from '../models/equipo';

@Component({
  selector: 'app-info-equipo',
  templateUrl: './info-equipo.component.html',
  styleUrls: ['./info-equipo.component.css'],
  providers: [EquipoService]
})
export class InfoEquipoComponent implements OnInit {

  routeSub: any;

  constructor(private route: ActivatedRoute) {

    this.routeSub = this.route.params.subscribe((params) => {
      console.log('params', params);
    });
  }
  ngOnInit() {
  }


}
