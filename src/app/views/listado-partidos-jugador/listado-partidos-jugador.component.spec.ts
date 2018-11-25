import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPartidosJugadorComponent } from './listado-partidos-jugador.component';

describe('ListadoPartidosJugadorComponent', () => {
  let component: ListadoPartidosJugadorComponent;
  let fixture: ComponentFixture<ListadoPartidosJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPartidosJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPartidosJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
