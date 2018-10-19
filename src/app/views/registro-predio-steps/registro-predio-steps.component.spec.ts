import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPredioStepsComponent } from './registro-predio-steps.component';

describe('RegistroPredioStepsComponent', () => {
  let component: RegistroPredioStepsComponent;
  let fixture: ComponentFixture<RegistroPredioStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPredioStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPredioStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
