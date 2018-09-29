import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilJugadorComponent } from './perfil-jugador.component';

describe('PerfilJugadorComponent', () => {
  let component: PerfilJugadorComponent;
  let fixture: ComponentFixture<PerfilJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
