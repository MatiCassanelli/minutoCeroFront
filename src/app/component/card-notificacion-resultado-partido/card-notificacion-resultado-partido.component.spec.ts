import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotificacionResultadoPartidoComponent } from './card-notificacion-resultado-partido.component';

describe('CardNotificacionResultadoPartidoComponent', () => {
  let component: CardNotificacionResultadoPartidoComponent;
  let fixture: ComponentFixture<CardNotificacionResultadoPartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNotificacionResultadoPartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNotificacionResultadoPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
