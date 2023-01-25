import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEntradaMercanciaComponent } from './menu-entrada-mercancia.component';

describe('MenuEntradaMercanciaComponent', () => {
  let component: MenuEntradaMercanciaComponent;
  let fixture: ComponentFixture<MenuEntradaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEntradaMercanciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEntradaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
