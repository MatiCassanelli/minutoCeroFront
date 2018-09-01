import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrellasJugadorComponent } from './estrellas-jugador.component';

describe('EstrellasJugadorComponent', () => {
  let component: EstrellasJugadorComponent;
  let fixture: ComponentFixture<EstrellasJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstrellasJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrellasJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
