import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogPlantelComponent } from './confirm-dialog-plantel.component';

describe('ConfirmDialogPlantelComponent', () => {
  let component: ConfirmDialogPlantelComponent;
  let fixture: ComponentFixture<ConfirmDialogPlantelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogPlantelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogPlantelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
