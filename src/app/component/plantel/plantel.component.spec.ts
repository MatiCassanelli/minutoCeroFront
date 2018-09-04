import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantelComponent } from './plantel.component';

describe('PlantelComponent', () => {
  let component: PlantelComponent;
  let fixture: ComponentFixture<PlantelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
