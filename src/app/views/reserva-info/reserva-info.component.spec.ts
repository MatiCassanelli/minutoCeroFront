import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaInfoComponent } from './reserva-info.component';

describe('ReservaInfoComponent', () => {
  let component: ReservaInfoComponent;
  let fixture: ComponentFixture<ReservaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
