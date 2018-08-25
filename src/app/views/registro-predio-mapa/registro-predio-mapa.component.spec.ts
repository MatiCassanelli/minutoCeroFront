import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPredioMapaComponent } from './registro-predio-mapa.component';

describe('RegistroPredioMapaComponent', () => {
  let component: RegistroPredioMapaComponent;
  let fixture: ComponentFixture<RegistroPredioMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPredioMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPredioMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
