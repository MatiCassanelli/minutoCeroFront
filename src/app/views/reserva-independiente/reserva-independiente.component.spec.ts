import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaIndependienteComponent } from './reserva-independiente.component';

describe('ReservaIndependienteComponent', () => {
  let component: ReservaIndependienteComponent;
  let fixture: ComponentFixture<ReservaIndependienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaIndependienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaIndependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
