import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDeCuentaComponent } from './resumen-de-cuenta.component';

describe('ResumenDeCuentaComponent', () => {
  let component: ResumenDeCuentaComponent;
  let fixture: ComponentFixture<ResumenDeCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenDeCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDeCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
