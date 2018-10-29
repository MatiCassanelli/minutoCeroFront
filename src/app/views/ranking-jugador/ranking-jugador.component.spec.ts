import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingJugadorComponent } from './ranking-jugador.component';

describe('RankingJugadorComponent', () => {
  let component: RankingJugadorComponent;
  let fixture: ComponentFixture<RankingJugadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingJugadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
