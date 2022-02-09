import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxpEmisionPalletComponent } from './cxp-emision-pallet.component';

describe('CxpEmisionPalletComponent', () => {
  let component: CxpEmisionPalletComponent;
  let fixture: ComponentFixture<CxpEmisionPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CxpEmisionPalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CxpEmisionPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
