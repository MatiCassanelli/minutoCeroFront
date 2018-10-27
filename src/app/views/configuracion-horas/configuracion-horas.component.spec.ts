import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionHorasComponent } from './configuracion-horas.component';

describe('ConfiguracionHorasComponent', () => {
  let component: ConfiguracionHorasComponent;
  let fixture: ComponentFixture<ConfiguracionHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
