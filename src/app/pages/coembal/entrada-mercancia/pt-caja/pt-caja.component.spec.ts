import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtCajaComponent } from './pt-caja.component';

describe('PtCajaComponent', () => {
  let component: PtCajaComponent;
  let fixture: ComponentFixture<PtCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
