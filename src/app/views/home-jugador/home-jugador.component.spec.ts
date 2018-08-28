import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeJugadorComponent } from './home-jugador.component';

describe('HomeJugadorComponent', () => {
  let component: HomeJugadorComponent;
  let fixture: ComponentFixture<HomeJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
