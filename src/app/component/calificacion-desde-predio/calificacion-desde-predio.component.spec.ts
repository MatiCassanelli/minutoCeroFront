import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionDesdePredioComponent } from './calificacion-desde-predio.component';

describe('CalificacionDesdePredioComponent', () => {
  let component: CalificacionDesdePredioComponent;
  let fixture: ComponentFixture<CalificacionDesdePredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionDesdePredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionDesdePredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
