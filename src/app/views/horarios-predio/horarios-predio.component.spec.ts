import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosPredioComponent } from './horarios-predio.component';

describe('HorariosPredioComponent', () => {
  let component: HorariosPredioComponent;
  let fixture: ComponentFixture<HorariosPredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosPredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
