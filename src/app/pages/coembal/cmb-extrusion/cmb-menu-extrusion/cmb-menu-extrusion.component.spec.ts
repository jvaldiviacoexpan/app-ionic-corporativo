import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbMenuExtrusionComponent } from './cmb-menu-extrusion.component';

describe('CmbMenuExtrusionPage', () => {
  let component: CmbMenuExtrusionComponent;
  let fixture: ComponentFixture<CmbMenuExtrusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmbMenuExtrusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbMenuExtrusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
