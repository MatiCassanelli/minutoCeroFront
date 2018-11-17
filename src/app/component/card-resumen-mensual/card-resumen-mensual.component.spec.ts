import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResumenMensualComponent } from './card-resumen-mensual.component';

describe('CardResumenMensualComponent', () => {
  let component: CardResumenMensualComponent;
  let fixture: ComponentFixture<CardResumenMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardResumenMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardResumenMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
