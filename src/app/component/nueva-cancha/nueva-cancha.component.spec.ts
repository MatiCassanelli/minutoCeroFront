import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCanchaComponent } from './nueva-cancha.component';

describe('NuevaCanchaComponent', () => {
  let component: NuevaCanchaComponent;
  let fixture: ComponentFixture<NuevaCanchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaCanchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
