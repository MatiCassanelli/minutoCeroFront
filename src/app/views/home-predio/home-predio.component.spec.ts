import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePredioComponent } from './home-predio.component';

describe('HomePredioComponent', () => {
  let component: HomePredioComponent;
  let fixture: ComponentFixture<HomePredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
