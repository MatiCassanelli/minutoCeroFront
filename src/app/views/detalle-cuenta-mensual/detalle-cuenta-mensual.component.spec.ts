import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCuentaMensualComponent } from './detalle-cuenta-mensual.component';

describe('DetalleCuentaMensualComponent', () => {
  let component: DetalleCuentaMensualComponent;
  let fixture: ComponentFixture<DetalleCuentaMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCuentaMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCuentaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
