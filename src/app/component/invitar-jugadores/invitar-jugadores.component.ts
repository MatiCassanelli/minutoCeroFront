import {Component, OnInit, Output, EventEmitter, Input, ElementRef} from '@angular/core';
import {Jugador} from '../../models/jugador';
import {JugadorService} from '../../../services/jugadorService';
import {EquipoService} from '../../../services/equipoService';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AmistadService} from '../../../services/amistadService';


@Component({
  selector: 'app-invitar-jugadores',
  templateUrl: './invitar-jugadores.component.html',
  styleUrls: ['./invitar-jugadores.component.css'],
  providers: [JugadorService]
})
export class InvitarJugadoresComponent implements OnInit {

  @Input() isReset;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<Jugador[]>;
  jugadoresSeleccionados: Jugador[] = [];
  jugadoresChipList: Jugador[] = [];
  jugadores: Jugador[];
  nombreJugador: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  @Output() notifyParent: EventEmitter<Array<Jugador>> = new EventEmitter<Array<Jugador>>();

  constructor(private jugadorService: JugadorService,
              private amistadService: AmistadService) {
  }

  ngOnInit() {
    // this.jugadorService.getJugadores().subscribe((resp) => {  // deberia ser un getamigos
    this.amistadService.getAmigos().subscribe((resp) => {
      console.log(resp);
      this.jugadores = resp;
      for (let jugador of resp) {
        this.nombreJugador.push(jugador.nombre + jugador.apellido);
      }
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map(fruit => fruit ? this._filter(fruit) : this.jugadores.slice()));
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      // this.jugadoresSeleccionados.push(value);
      console.log(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: Jugador): void {
    const index = this.jugadoresSeleccionados.indexOf(fruit);

    if (index >= 0) {
      this.jugadoresSeleccionados.splice(index, 1);
      this.jugadoresChipList.splice(index, 1);
      this.notifyParent.emit(this.jugadoresSeleccionados);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.jugadoresSeleccionados.includes(event.option.value)) {
      this.jugadoresSeleccionados.push(event.option.value);
      this.jugadoresChipList.push(event.option.value);
      this.fruitCtrl.reset();
      this.notifyParent.emit(this.jugadoresSeleccionados);
    }
    this.fruitInput.nativeElement.value = null;
    this.fruitCtrl.setValue(null);

    // const index = this.jugadoresChipList.indexOf(event.option.value);
    // if (index >= 0) {
    //   this.jugadoresChipList.splice(index, 1);
    // }
  }

  private _filter(value: string): Jugador[] {
    const filterValue = value;
    return this.jugadores.filter(state => state.nombre.toLowerCase().indexOf(filterValue) === 0 ||
      state.nombre.indexOf(filterValue) === 0 ||
      state.apellido.indexOf(filterValue) === 0 ||
      state.apellido.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnChanges() {
    this.isReset = true;
    // this.jugadoresChipList.slice(0, this.jugadoresChipList.length - 1);
    this.jugadoresChipList = [];
    this.isReset = false;
    if (this.fruitCtrl.status === 'VALID') {
      this.fruitCtrl.reset();
      this.fruitCtrl.setValue(null);
      this.jugadoresSeleccionados = [];
    }

  }
}
