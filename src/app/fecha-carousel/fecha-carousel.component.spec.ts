import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaCarouselComponent } from './fecha-carousel.component';

describe('FechaCarouselComponent', () => {
  let component: FechaCarouselComponent;
  let fixture: ComponentFixture<FechaCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechaCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
