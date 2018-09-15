import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotificacionComponent } from './card-notificacion.component';

describe('CardNotificacionComponent', () => {
  let component: CardNotificacionComponent;
  let fixture: ComponentFixture<CardNotificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNotificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
