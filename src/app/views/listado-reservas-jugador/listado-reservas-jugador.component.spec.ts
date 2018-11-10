import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoReservasJugadorComponent } from './listado-reservas-jugador.component';

describe('ListadoReservasJugadorComponent', () => {
  let component: ListadoReservasJugadorComponent;
  let fixture: ComponentFixture<ListadoReservasJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoReservasJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoReservasJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
