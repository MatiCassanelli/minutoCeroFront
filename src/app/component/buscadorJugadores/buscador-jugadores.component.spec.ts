import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorJugadoresComponent } from './buscador-jugadores.component';

describe('BuscadorJugadoresComponent', () => {
  let component: BuscadorJugadoresComponent;
  let fixture: ComponentFixture<BuscadorJugadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorJugadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
