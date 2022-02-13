import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbEmisionPalletCajaComponent } from './cmb-emision-pallet-caja.component';

describe('CmbEmisionPalletCajaComponent', () => {
  let component: CmbEmisionPalletCajaComponent;
  let fixture: ComponentFixture<CmbEmisionPalletCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmbEmisionPalletCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbEmisionPalletCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
