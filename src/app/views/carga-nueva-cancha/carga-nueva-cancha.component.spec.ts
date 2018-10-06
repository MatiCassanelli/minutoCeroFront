import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaNuevaCanchaComponent } from './carga-nueva-cancha.component';

describe('CargaNuevaCanchaComponent', () => {
  let component: CargaNuevaCanchaComponent;
  let fixture: ComponentFixture<CargaNuevaCanchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaNuevaCanchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaNuevaCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
