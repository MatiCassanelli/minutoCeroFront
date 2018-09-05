import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPartidosComponent } from './listado-partidos.component';

describe('ListadoPartidosComponent', () => {
  let component: ListadoPartidosComponent;
  let fixture: ComponentFixture<ListadoPartidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPartidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
