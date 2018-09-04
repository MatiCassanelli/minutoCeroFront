import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizarPartidoComponent } from './organizar-partido.component';

describe('OrganizarPartidoComponent', () => {
  let component: OrganizarPartidoComponent;
  let fixture: ComponentFixture<OrganizarPartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizarPartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
