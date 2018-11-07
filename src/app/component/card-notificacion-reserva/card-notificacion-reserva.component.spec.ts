import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotificacionReservaComponent } from './card-notificacion-reserva.component';

describe('CardNotificacionReservaComponent', () => {
  let component: CardNotificacionReservaComponent;
  let fixture: ComponentFixture<CardNotificacionReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNotificacionReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNotificacionReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
