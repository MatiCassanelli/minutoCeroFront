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


@Component({
  selector: 'app-invitar-jugadores',
  templateUrl: './invitar-jugadores.component.html',
  styleUrls: ['./invitar-jugadores.component.css'],
  providers: [JugadorService]
})
// export class InvitarJugadoresComponent implements OnInit {
export class InvitarJugadoresComponent implements OnInit {

  // checked: boolean;
  // form: FormGroup;
  // jugadores: Jugador[];
  // jugadoresSeleccionados: Jugador[];
  // @Output() notifyParent: EventEmitter<Array<Jugador>> = new EventEmitter<Array<Jugador>>();
  // @Output() jugadoresInvitados: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  // @ViewChild('invitar') myForm: NgForm;
  // @Input() isReset;
  //
  // stateCtrl = new FormControl();
  // filteredStates: Observable<Jugador[]>;
  //
  // constructor(private fb: FormBuilder,
  //             private jugadorService: JugadorService) {
  //   this.jugadoresSeleccionados = new Array<Jugador>();
  //   this.checked = false;
  // }
  //
  // ngOnInit() {
  //   this.form = this.fb.group({
  //     jugador: null
  //   });
  //   this.jugadorService.getJugadores().subscribe((resp) => {
  //     this.jugadores = resp;
  //     this.filteredStates = this.stateCtrl.valueChanges
  //       .pipe(
  //         startWith(''),
  //         map(state => state ? this._filterStates(state) : this.jugadores.slice())
  //       );
  //   });
  // }
  //
  // // esto es para las sugerencias
  // getJugadores(event): Array<Jugador> {
  //   this.jugadorService.getJugadores(event.query).subscribe((resp) => {
  //     console.log(resp);
  //     this.jugadores = resp;
  //   });
  //   return this.jugadores;
  // }
  //
  // // sendJugadores() {
  // //   this.jugadoresInvitados.emit(this.checked);
  // //   this.notifyParent.emit(this.jugadoresSeleccionados);
  // // }
  // // agregarJug(value) {
  // //   console.log('agregando', value);
  // //   this.jugadoresSeleccionados.push(value);
  // //   console.log('this.jugadoresSeleccionados', this.jugadoresSeleccionados);
  // //   // this.checked = true;
  // //   // this.notifyParent.emit(this.jugadoresSeleccionados);
  // // }
  // // eliminarJug(value) {
  // //   console.log('eliminando', value);
  // //   this.jugadoresSeleccionados.splice(this.jugadoresSeleccionados.indexOf(value), 1);
  // //   console.log('this.jugadoresSeleccionados', this.jugadoresSeleccionados);
  // //   // if(this.jugadoresSeleccionados.length === 0){
  // //   //   this.checked = false;
  // //   // }
  // //   // this.notifyParent.emit(this.jugadoresSeleccionados);
  // // }
  // agregarJug(value) {
  //   this.jugadoresSeleccionados.push(value);
  //   this.notifyParent.emit(this.jugadoresSeleccionados);
  // }
  //
  // eliminarJug(value) {
  //   this.jugadoresSeleccionados.splice(this.jugadoresSeleccionados.indexOf(value), 1);
  //   this.notifyParent.emit(this.jugadoresSeleccionados);
  // }
  //
  // ngOnChanges() {
  //   this.isReset = true;
  //   this.jugadoresSeleccionados = [];
  //   this.isReset = false;
  //   if (this.myForm.status === 'VALID')
  //     this.myForm.resetForm();
  // }
  //
  // private _filterStates(value: string): Jugador[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.jugadores.filter(state => state.nombre.toLowerCase().indexOf(filterValue) === 0);
  // }
  visible = true;
  @Input() isReset;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<Jugador[]>;
  jugadoresSeleccionados: Jugador[] = [];
  // jugadores: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  jugadores: Jugador[];
  nombreJugador: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  @Output() notifyParent: EventEmitter<Array<Jugador>> = new EventEmitter<Array<Jugador>>();

  constructor(private jugadorService: JugadorService) {
  }
  ngOnInit() {
    this.jugadorService.getJugadores().subscribe((resp) => {
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
      console.log(value)
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
      // this.jugadores.push(fruit);
      this.jugadoresSeleccionados.splice(index, 1);
      this.notifyParent.emit(this.jugadoresSeleccionados);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.jugadoresSeleccionados.includes(event.option.value)) {
      this.jugadoresSeleccionados.push(event.option.value);
      this.notifyParent.emit(this.jugadoresSeleccionados);
      // this.jugadores.slice(this.jugadores.indexOf(event.option.value), 1);
    }
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    console.log(this.jugadoresSeleccionados);
  }

  private _filter(value: string): Jugador[] {
    const filterValue = value;
    return this.jugadores.filter(state => state.nombre.toLowerCase().indexOf(filterValue) === 0 ||
      state.nombre.indexOf(filterValue) === 0 ||
      state.apellido.indexOf(filterValue) === 0 ||
      state.apellido.toLowerCase().indexOf(filterValue) === 0);
  }

  agregarJug(value) {
    this.jugadoresSeleccionados.push(value);
    this.notifyParent.emit(this.jugadoresSeleccionados);
  }

  eliminarJug(value) {
    this.jugadoresSeleccionados.splice(this.jugadoresSeleccionados.indexOf(value), 1);
    this.notifyParent.emit(this.jugadoresSeleccionados);
  }
}
