import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalificacionComponent } from './card-calificacion.component';

describe('CardCalificacionComponent', () => {
  let component: CardCalificacionComponent;
  let fixture: ComponentFixture<CardCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
