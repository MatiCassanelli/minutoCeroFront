import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Jugador} from '../../models/jugador';
import {JugadorService} from '../../../services/jugadorService';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-buscador-jugadores',
  templateUrl: './buscador-jugadores.component.html',
  styleUrls: ['./buscador-jugadores.component.css']
})
export class BuscadorJugadoresComponent implements OnInit {

  jugadorCtrl = new FormControl();
  filteredJugadores: Observable<Jugador[]>;
  jugadores: Jugador[] = [];
  jugadorBuscado: Jugador;
  @ViewChild('jugadorInput') jugadorInput: ElementRef;

  constructor(private jugadorService: JugadorService,
              private router: Router) {
  }

  ngOnInit() {
    this.jugadorService.getJugadores().subscribe((resp) => {
      this.jugadores = resp;
      this.filteredJugadores = this.jugadorCtrl.valueChanges.pipe(
        startWith(null),
        map(fruit => fruit ? this._filter(fruit) : this.jugadores.slice()));
    });
  }

  private _filter(value: string): Jugador[] {
    const filterValue = value;
    return this.jugadores.filter(state => state.nombre.toLowerCase().indexOf(filterValue) === 0 ||
      state.nombre.indexOf(filterValue) === 0 ||
      state.apellido.indexOf(filterValue) === 0 ||
      state.apellido.toLowerCase().indexOf(filterValue) === 0);
  }

  selected(event) {
    console.log(event.option.value);
    this.jugadorCtrl.reset();
    this.jugadorInput.nativeElement.value = null;
    this.router.navigateByUrl('/jugador/jugador/' + event.option.value._id);
    // this.jugadorCtrl.setValue(event.option.value.nombre + ' ' + event.option.value.apellido);
  }
}
