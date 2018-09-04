import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeporteCanchaPartidoComponent } from './deporte-cancha-partido.component';

describe('DeporteCanchaPartidoComponent', () => {
  let component: DeporteCanchaPartidoComponent;
  let fixture: ComponentFixture<DeporteCanchaPartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeporteCanchaPartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeporteCanchaPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
