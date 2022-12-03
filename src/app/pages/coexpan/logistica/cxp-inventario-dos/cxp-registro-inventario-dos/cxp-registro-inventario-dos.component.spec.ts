import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxpRegistroInventarioDosComponent } from './cxp-registro-inventario-dos.component';

describe('CxpRegistroInventarioDosComponent', () => {
  let component: CxpRegistroInventarioDosComponent;
  let fixture: ComponentFixture<CxpRegistroInventarioDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CxpRegistroInventarioDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CxpRegistroInventarioDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
