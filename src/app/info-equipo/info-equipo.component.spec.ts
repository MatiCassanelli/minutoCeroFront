import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEquipoComponent } from './info-equipo.component';

describe('InfoEquipoComponent', () => {
  let component: InfoEquipoComponent;
  let fixture: ComponentFixture<InfoEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
