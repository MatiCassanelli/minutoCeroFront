import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitarJugadoresComponent } from './invitar-jugadores.component';

describe('InvitarJugadoresComponent', () => {
  let component: InvitarJugadoresComponent;
  let fixture: ComponentFixture<InvitarJugadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitarJugadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitarJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
