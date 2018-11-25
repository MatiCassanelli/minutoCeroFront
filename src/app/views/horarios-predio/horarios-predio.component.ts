import {Component, OnInit} from '@angular/core';
import {PredioService} from '../../../services/predioService';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-horarios-predio',
  templateUrl: './horarios-predio.component.html',
  styleUrls: ['./horarios-predio.component.css']
})
export class HorariosPredioComponent implements OnInit {

  constructor(private predioService: PredioService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  getHorario(event) {
    this.predioService.setHorarios(event).subscribe((asd) => {
      this._openSnackBar();
    });
  }

  getConfigHorarios(event) {
    this.predioService.setConfiguracionHorarios(event).subscribe((asd) => {
      this._openSnackBar();
    });
  }

  private _openSnackBar() {
    this.snackBar.open('Horarios Actualizados', '', {
      duration: 750,
    });
  }
}
