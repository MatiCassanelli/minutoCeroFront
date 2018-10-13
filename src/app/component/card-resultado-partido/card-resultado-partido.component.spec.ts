import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResultadoPartidoComponent } from './card-resultado-partido.component';

describe('CardResultadoPartidoComponent', () => {
  let component: CardResultadoPartidoComponent;
  let fixture: ComponentFixture<CardResultadoPartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardResultadoPartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardResultadoPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
