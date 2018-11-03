import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPredioComponent } from './reserva-predio.component';

describe('ReservaPredioComponent', () => {
  let component: ReservaPredioComponent;
  let fixture: ComponentFixture<ReservaPredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaPredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
