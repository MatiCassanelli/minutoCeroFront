import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPredio1Component } from './registrar-predio1.component';

describe('RegistrarPredio1Component', () => {
  let component: RegistrarPredio1Component;
  let fixture: ComponentFixture<RegistrarPredio1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarPredio1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPredio1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
