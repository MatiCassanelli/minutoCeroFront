import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-horarios-predio',
  templateUrl: './horarios-predio.component.html',
  styleUrls: ['./horarios-predio.component.css']
})
export class HorariosPredioComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  getHorario(event) {
    console.log(event);
  }

  getConfigHorarios(event) {

  }
}
